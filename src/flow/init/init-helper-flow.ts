import * as vscode from 'vscode';
import { InitStep } from "../../step/init/init-helper-step";
import { StepBluePrint } from "../../step/step-blueprint";
import { BaseFlow } from "../base-flow";
import { CreateRootProjectFlow } from '../create-root-project/create-root-project-flow';
import { CreateSingleProjectFlow } from '../create-single-project/single-create-project-flow';
import { FlowConfigTemplate } from '../flow-config-template';
import { FlowRunner } from '../flow-runner';
import { InitFlowConfig } from "./init-helper-flow-config";

export class InitFlow extends BaseFlow<InitFlowConfig>
{
	getFirstStep(_config: InitFlowConfig): StepBluePrint<InitFlowConfig> {

		return {
			stepType: InitStep,
			accept: InitFlow._onInitAccept,
			cancel: InitFlow._onInitCanceled
		}
	}

	private static _onInitAccept(_config: InitFlowConfig): undefined
	{
		if(_config.isGroupingProject)
		{
			vscode.window.showInformationMessage('Creating root project');
			const createProjectConfig = FlowConfigTemplate.getDefaultCreateRootProjectFlowConfig();
			FlowRunner.executeFlow(createProjectConfig, CreateRootProjectFlow);
		}
		else
		{
			vscode.window.showInformationMessage('Creating single project');
			const createProjectConfig = FlowConfigTemplate.getDefaultCreateProjectFlowConfig();
			FlowRunner.executeFlow(createProjectConfig, CreateSingleProjectFlow);
		}
		return undefined;
	}

	private static _onInitCanceled(_config: InitFlowConfig): undefined
	{
		return undefined;
	}
}