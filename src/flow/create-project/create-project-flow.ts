import * as vscode from 'vscode';
import { BaseStep } from "../../step/base-step";
import { BaseFlow } from "../base-flow";
import { CreateProjectFlowConfig } from "./create-project-flow-config";
import { InputProjectNameStep } from "../../step/project/input-project-name-step";
import { StepService } from '../../service/step-service';
import { SelectProjectStep } from '../../step/project/select-project-step';
import { SelectProjectTypeStep } from '../../step/project/select-project-type-step';
import { SelectProjectLanguageStep } from '../../step/project/select-project-language-step';

export class CreateProjectFlow extends BaseFlow<CreateProjectFlowConfig>
{
	getFirstStep(_config: CreateProjectFlowConfig): BaseStep<CreateProjectFlowConfig> {
		return this.stepService.createStep(
			InputProjectNameStep,
			CreateProjectFlow._onProjectNameAccept,
			CreateProjectFlow._onProjectCreationCanceled,
			_config
		)
	}
	
	private static _onProjectNameAccept(_config: CreateProjectFlowConfig, _stepService: StepService<CreateProjectFlowConfig>): BaseStep<CreateProjectFlowConfig>
	{
		vscode.window.showInformationMessage(`Project name set: ${_config.projectName}`);

		return _stepService.createStep(
			SelectProjectTypeStep,
			CreateProjectFlow._onProjectTypeSelected,
			CreateProjectFlow._onProjectCreationCanceled,
			_config
		);
	}

	private static _onProjectTypeSelected(_config: CreateProjectFlowConfig, _stepService: StepService<CreateProjectFlowConfig>): BaseStep<CreateProjectFlowConfig>
	{
		vscode.window.showInformationMessage(`Project type set: ${_config.type}`);

		return _stepService.createStep(
			SelectProjectLanguageStep,
			CreateProjectFlow._onProjectLanguageSelected,
			CreateProjectFlow._onProjectCreationCanceled,
			_config
		);
	}

	private static _onProjectLanguageSelected(_config: CreateProjectFlowConfig)
	{
		vscode.window.showInformationMessage(`Project language set: ${JSON.stringify(_config.languages)}`);
	}

	private static _onProjectCreationCanceled(_config: CreateProjectFlowConfig)
	{
		vscode.window.showErrorMessage('Project creation canceled');
	}
}