import * as vscode from 'vscode';
import { BaseStep } from "../../step/step-base";
import { BaseFlow } from "../base-flow";
import { CreateProjectFlowConfig } from "./create-project-flow-config";
import { InputProjectNameStep } from "../../step/project/input-project-name-step";

export class CreateProjectFlow extends BaseFlow<CreateProjectFlowConfig>
{
	getFirstStep(_config: CreateProjectFlowConfig): BaseStep<CreateProjectFlowConfig> {
		return this.stepService.createStep(
			InputProjectNameStep,
			this._onProjectNameAccept,
			this._onProjectNameCanceled,
			_config
		)
	}
	
	private _onProjectNameAccept(_config: CreateProjectFlowConfig)
	{
		vscode.window.showInformationMessage(`Project name set: ${_config.projectName}`);
	}

	private _onProjectNameCanceled(_config: CreateProjectFlowConfig)
	{
		vscode.window.showErrorMessage('Project name not set!');
	}
}