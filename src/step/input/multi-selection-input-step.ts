import { BaseFlowConfig } from "../../flow/base-flow-config";
import { StepService } from '../../service/step-service';
import { BaseStep } from "../base-step";
import { StepDisplayType } from '../step-display-type';
import { SelectionItem } from './selection-input-step';

export abstract class MultiSelectionInputStep<TItem, TFlowConfig extends BaseFlowConfig> extends BaseStep<TFlowConfig>
{
	constructor(
		_config: TFlowConfig, 
		_service: StepService<TFlowConfig>)
	{
		super(StepDisplayType.MULTI_SELECTION, _config, _service);
	}

	setSelectedValue(selectedItems: SelectionItem<TItem>[]): void
	{
		this.onValueSelected(selectedItems);
	}

	abstract validateInput(selectedItems: SelectionItem<TItem>[]): true | string;

	protected abstract onValueSelected(selectedItems: SelectionItem<TItem>[]): void;
}