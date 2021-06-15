import * as vscode from 'vscode';
import { InitStep } from "../../step/init/init-helper-step";
import { StepBluePrint } from "../../step/step-blueprint";
import { BaseFlow } from "../base-flow";
import { InitFlowConfig } from "./init-helper-flow-config";

export class InitFlow extends BaseFlow<InitFlowConfig>
{
	getFirstStep(_config: InitFlowConfig): StepBluePrint<InitFlowConfig> {
		return {
			stepType: InitStep,
			next: InitFlow._onInitAccept,
			canceled: InitFlow._onInitCanceled
		}
	}

	private static _onInitAccept(_config: InitFlowConfig): undefined
	{
		if(_config.isGroupingProject)
		{
			vscode.window.showInformationMessage('Creating root project');
		}
		else
		{
			vscode.window.showInformationMessage('Creating single project');
		}
		return undefined;
	}

	private static _onInitCanceled(_config: InitFlowConfig): undefined
	{
		return undefined;
	}
}