import { BaseFlowConfig } from "../../flow/base-flow-config";
import { BaseStep } from "../base-step";
import { StepDisplayType } from '../step-display-type';
import { SelectionInputStepConfig, SelectionItem } from './selection-input-step';

export abstract class MultiSelectionInputStep<TItem, TFlowConfig extends BaseFlowConfig> extends BaseStep<TFlowConfig, SelectionInputStepConfig<TItem>>
{
	constructor(
		_config: TFlowConfig,
		_stepName: string)
	{
		super(StepDisplayType.MULTI_SELECTION, _config, _stepName);
	}

	setSelectedValue(selectedItems: SelectionItem<TItem>[]): void
	{
		this.onValueSelected(selectedItems);
	}

	abstract validateInput(selectedItems: SelectionItem<TItem>[]): true | string;

	protected abstract onValueSelected(selectedItems: SelectionItem<TItem>[]): void;
}