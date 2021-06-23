import * as vscode from 'vscode';
import { BaseStep, BaseStepConfig } from "../step/base-step";
import { StepDisplayType } from "../step/step-display-type";
import { TextInputStep, TextInputStepConfig } from "../step/input/text-input-step";
import { BaseFlow } from "./base-flow";
import { BaseFlowConfig } from "./base-flow-config";
import { SelectionInputStep, SelectionInputStepConfig, SelectionItem } from '../step/input/selection-input-step';
import { MultiSelectionInputStep } from '../step/input/multi-selection-input-step';
import { StepBluePrint } from '../step/step-blueprint';

export class FlowRunner
{
	static executeFlow<TFlowConfig extends BaseFlowConfig, TFlow extends BaseFlow<TFlowConfig>>(
		_config: TFlowConfig,
		_flowType: (new(_config: TFlowConfig) => TFlow))
	{
		const flow = new _flowType(_config);
		const firstStepBlueprint = flow.getFirstStep(_config);
		this._displayStep<TFlowConfig>(_config, firstStepBlueprint);
	}

	private static _displayStep<TFlowConfig extends BaseFlowConfig>(_config: TFlowConfig, _stepBluePrint: StepBluePrint<TFlowConfig>)
	{
		const step = new _stepBluePrint.stepType(_config);
		step.getNextStep = _stepBluePrint.accept;
		step.onCanceled = _stepBluePrint.cancel;

		switch(step.displayType)
		{
			case StepDisplayType.TEXT_INPUT:
			{
				this._displayTextInputStep(<TextInputStep<TFlowConfig>>step);
				break;
			}
			case StepDisplayType.SELECTION:
			{
				this._displaySelectionStep(<SelectionInputStep<any, TFlowConfig>>step);
				break;
			}
			case StepDisplayType.MULTI_SELECTION:
			{
				this._displayMultiSelectionStep(<MultiSelectionInputStep<any, TFlowConfig>>step);
				break;
			}
		}
	}

	private static _displayTextInputStep<TFlowConfig extends BaseFlowConfig>(_step: TextInputStep<TFlowConfig>)
	{
		const stepConfig = <TextInputStepConfig>_step.getStepConfig();

		let inputValue: string = stepConfig.defaultValue ? stepConfig.defaultValue : '';
		let inputAccepted: boolean = false;

		const inputBox = vscode.window.createInputBox();

		inputBox.title = stepConfig.stepTitle;
		inputBox.placeholder = stepConfig.placeHolder;
		inputBox.prompt = stepConfig.prompt;
		inputBox.ignoreFocusOut = stepConfig.ignoreFocusOut;

		// Capture any user input value in 'inputValue'
		inputBox.onDidChangeValue((value: string) => {
			inputValue = value;
		});

		inputBox.value = stepConfig.defaultValue ? stepConfig.defaultValue : '';

		// When the user accepts the input (presses enter) fire the step accept callback and go to next step if any
		inputBox.onDidAccept(() => {
			inputAccepted = true;

			const validationMessage = _step.validateInput(inputValue);

			if(typeof validationMessage === 'string')
			{
				inputBox.validationMessage = validationMessage;
				return;
			}

			inputBox.validationMessage = undefined;
			_step.setInputValue(inputValue);

			this._getNextCallbackAndDisplay(_step);

			inputBox.hide();
		});

		inputBox.onDidHide(() => {
			this._callOnCanceledIfNotAccepted(_step, inputAccepted);
			inputBox.dispose();
		});

		inputBox.show();
	}

	private static _displaySelectionStep<TFlowConfig extends BaseFlowConfig>(_step: SelectionInputStep<any, TFlowConfig>)
	{
		const config = <SelectionInputStepConfig<any>>_step.getStepConfig();

		let selectedQuickPick: vscode.QuickPickItem;
		let inputAccepted: boolean = false;

		const quickPick = vscode.window.createQuickPick();

		quickPick.title = config.stepTitle;
		quickPick.placeholder = config.placeHolder;
		quickPick.ignoreFocusOut = config.ignoreFocusOut;

		quickPick.items = config.items;
		quickPick.canSelectMany = false;

		quickPick.onDidChangeActive((items: vscode.QuickPickItem[]) => {
			if(items.length > 0)
			{
				selectedQuickPick = items[0];
				quickPick.value = selectedQuickPick.label;
			}
		});

		quickPick.onDidAccept(() => {
			if(selectedQuickPick)
			{
				inputAccepted = true;

				const selectedItem = <SelectionItem<any>>selectedQuickPick;

				_step.setSelectedValue(selectedItem);

				this._getNextCallbackAndDisplay(_step);
				quickPick.hide();
			}
		});

		quickPick.onDidHide(() => {			
			this._callOnCanceledIfNotAccepted(_step, inputAccepted);
			quickPick.dispose();
		});

		quickPick.show();
	}

	private static _displayMultiSelectionStep<TFlowConfig extends BaseFlowConfig>(_step: MultiSelectionInputStep<any, TFlowConfig>)
	{
		const config = <SelectionInputStepConfig<any>>_step.getStepConfig();

		let inputAccepted: boolean = false;

		const quickPick = vscode.window.createQuickPick();

		quickPick.title = config.stepTitle;
		quickPick.placeholder = config.placeHolder;
		quickPick.ignoreFocusOut = config.ignoreFocusOut;

		quickPick.items = config.items;
		quickPick.canSelectMany = true;

		quickPick.onDidAccept(() => {

			const selection: SelectionItem<any>[] = <SelectionItem<any>[]>quickPick.selectedItems;

			if(selection && selection.length > 0)
			{
				inputAccepted = true;

				const validationMessage = _step.validateInput(selection);

				if(typeof validationMessage === 'string')
				{
					vscode.window.showErrorMessage(validationMessage);
					return;
				}

				_step.setSelectedValue(selection);

				this._getNextCallbackAndDisplay(_step);

				quickPick.hide();
			}
		});

		quickPick.onDidHide(() => {			
			this._callOnCanceledIfNotAccepted(_step, inputAccepted);
			quickPick.dispose();
		});

		quickPick.show();
	}

	private static _getNextCallbackAndDisplay<TFlowConfig extends BaseFlowConfig>(_step: BaseStep<TFlowConfig, BaseStepConfig>)
	{
		const getNextStep = _step.getNextStep;

		if(getNextStep)
		{
			const nextStepBlueprint = getNextStep(_step.config);

			if(nextStepBlueprint)
			{
				this._displayStep(_step.config, nextStepBlueprint);
			}				
		}
	}

	private static _callOnCanceledIfNotAccepted<TFlowConfig extends BaseFlowConfig>(_step: BaseStep<TFlowConfig, BaseStepConfig>, _inputAccepted: boolean)
	{
		if(!_inputAccepted)
		{
			const onCanceled = _step.onCanceled;

			if(onCanceled)
			{
				onCanceled(_step.config);
			}
		}
	}
}