import * as vscode from 'vscode';
import { StepService } from "../service/step-service";
import { BaseStep } from "../step/step-base";
import { StepDisplayType } from "../step/step-display-type";
import { TextInputFlowConfig, TextInputStep, TextInputStepConfig } from "../step/text-input-step";
import { BaseFlow } from "./base-flow";
import { BaseFlowConfig } from "./base-flow-config";

export class FlowRunner
{
	static executeFlow<TConfig extends BaseFlowConfig, TFlow extends BaseFlow<TConfig>>(
		_config: TConfig,
		_flowType: (new(_config: TConfig, _service: StepService<TConfig>) => TFlow))
	{
		const stepService = new StepService<TConfig>();

		const flow = new _flowType(_config, stepService);

		const firstStep = flow.getFirstStep(_config);

		this._displayStep<TConfig>(firstStep);
	}

	private static _displayStep<TConfig extends BaseFlowConfig>(_step: BaseStep<TConfig>)
	{
		const displayType = _step.stepDisplayType;

		switch(displayType)
		{
			case StepDisplayType.TEXT_INPUT:
			{
				this._displayTextInputStep(<TextInputStep<any>>_step)
			}
		}
	}

	private static _displayTextInputStep<TConfig extends TextInputFlowConfig>(_step: TextInputStep<TConfig>)
	{
		const stepConfig = <TextInputStepConfig>_step.getStepConfig();

		let inputValue: string = '';
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

		// When the user accepts the input (presses enter) fire the step accept callback and go to next step if any
		inputBox.onDidAccept(() => {
			inputAccepted = true;

			const validationMessage = _step.validateInput(inputValue);

			if(typeof validationMessage === 'string')
			{
				console.log('invalid');
				console.log(inputValue);
				inputBox.validationMessage = validationMessage;
				return;
			}

			_step.setInputValue(inputValue);

			const getNextStep = _step.getNextStep;

			if(getNextStep)
			{
				const nextStep = getNextStep(_step.config);

				if(nextStep instanceof BaseStep)
				{
					this._displayStep(nextStep);
				}				
			}
			inputBox.dispose();		
		});

		inputBox.onDidHide(() => {

			if(!inputAccepted)
			{
				const onCanceled = _step.onCanceled;

				if(onCanceled)
				{
					onCanceled(_step.config);
				}
			}

			inputBox.dispose();
		});

		inputBox.show();
	}
}