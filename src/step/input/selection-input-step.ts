import * as vscode from 'vscode';
import { BaseFlowConfig } from "../../flow/base-flow-config";
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

export abstract class SelectionInputStep<TItem, TFlowConfig extends BaseFlowConfig> extends BaseStep<TFlowConfig, SelectionInputStepConfig<TItem>>
{
	constructor(
		_config: TFlowConfig,
		_stepName: string)
	{
		super(StepDisplayType.SELECTION, _config, _stepName);
	}

	setSelectedValue(selectedItem: SelectionItem<TItem>): void
	{
		this.onValueSelected(selectedItem);
	}

	abstract validateInput(selectedItem: SelectionItem<TItem>): true | string;

	protected abstract onValueSelected(selectedItem: SelectionItem<TItem>): void;
}