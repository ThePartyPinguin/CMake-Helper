import * as vscode from 'vscode';
import { BaseFlowConfig } from "../../flow/base-flow-config";
import { StepService } from '../../service/step-service';
import { BaseStep, BaseStepConfig } from "../base-step";
import { StepDisplayType } from '../step-display-type';

export interface SelectionItem<TItem> extends vscode.QuickPickItem
{
	item: TItem;
}

export interface SelectionInputStepConfig<TSelectionItem> extends BaseStepConfig
{
	items: SelectionItem<TSelectionItem>[];
}

export abstract class SelectionInputStep<TItem, TFlowConfig extends BaseFlowConfig> extends BaseStep<TFlowConfig>
{
	constructor(
		_config: TFlowConfig, 
		_service: StepService<TFlowConfig>)
	{
		super(StepDisplayType.SELECTION, _config, _service);
	}

	setSelectedValue(selectedItem: SelectionItem<TItem>): void
	{
		this.onValueSelected(selectedItem);
	}

	abstract validateInput(selectedItem: SelectionItem<TItem>): true | string;

	protected abstract onValueSelected(selectedItem: SelectionItem<TItem>): void;
}