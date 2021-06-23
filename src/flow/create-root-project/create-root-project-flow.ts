import * as vscode from 'vscode';
import { Project } from '../../model/project/project';
import { ProjectService } from '../../service/project-service';
import { InputRootProjectNameStep } from "../../step/root-project/input-root-project-name-step";
import { InputRootProjectDirStep } from '../../step/root-project/input-root-project-dir-step';
import { StepBluePrint } from "../../step/step-blueprint";
import { CreateProjectFlow } from '../create-project/create-project-flow';
import { CreateRootProjectFlowConfig } from "./create-root-project-flow-config";

export class CreateRootProjectFlow extends CreateProjectFlow<CreateRootProjectFlowConfig>
{
	getFirstStep(_config: CreateRootProjectFlowConfig): StepBluePrint<CreateRootProjectFlowConfig> {
		return {
			stepType: InputRootProjectNameStep,
			accept: CreateRootProjectFlow._onRootProjectNameAccept,
			cancel: CreateRootProjectFlow._onRootProjectCreateCancel
		};
	}

	private static _onRootProjectNameAccept(_config: CreateRootProjectFlowConfig): StepBluePrint<CreateRootProjectFlowConfig>
	{
		vscode.window.showInformationMessage(`Root project name set: ${_config.rootProjectName}`);

		return {
			stepType: InputRootProjectDirStep,
			accept: CreateRootProjectFlow._onRootBinaryNameAccept,
			cancel: CreateRootProjectFlow._onRootProjectCreateCancel
		};
	}

	private static _onRootBinaryNameAccept(_config: CreateRootProjectFlowConfig): StepBluePrint<CreateRootProjectFlowConfig>
	{
		vscode.window.showInformationMessage(`Root binary directory set: ${_config.rootProjectDirectory}`);
		return CreateRootProjectFlow.continueProjectCreateFlow(_config, CreateRootProjectFlow._onCreateFlowComplete);
	}

	private static _onRootProjectCreateCancel(_config: CreateRootProjectFlowConfig): void
	{
		vscode.window.showErrorMessage('Root project creation canceled');
	}

	private static _onCreateFlowComplete(_config: CreateRootProjectFlowConfig, _project: Project): undefined
	{
		vscode.window.showInformationMessage(`Root binary directory set: ${_config.rootProjectDirectory}`);
		const rootProject: Project = {
			name: _config.rootProjectName,
			relativePath: _config.rootProjectDirectory,
			version: '1.0.0.0',
			language: _project.language,
			isRootProject: true,
			childProjects: [
				_project.relativePath
			]
		}

		const projectService: ProjectService = new ProjectService();
		projectService.saveProject(rootProject);
		projectService.saveProject(_project);
		return undefined;
	}
}