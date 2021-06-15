import * as vscode from 'vscode';
import { BaseFlow } from "../base-flow";
import { CreateProjectFlowConfig } from "./create-project-flow-config";
import { InputProjectNameStep } from "../../step/project/input-project-name-step";
import { SelectProjectTypeStep } from '../../step/project/select-project-type-step';
import { ProjectLanguageConfig, SelectProjectLanguageStep } from '../../step/project/select-project-language-step';
import { InputSourceDirStep } from '../../step/project/input-source-dir-step';
import { StepBluePrint } from '../../step/step-blueprint';
import { InputIncludeDirStep } from '../../step/project/input-include-dir-step';
import { SelectPlatformStep } from '../../step/project/select-project-platform-step';
import { Project } from '../../model/project/project';
import { ProjectLanguage } from '../../model/project/project-language';
import { Platform, PlatformType } from '../../model/project/platform/platform';
import { InputProjectRelativePathStep } from '../../step/project/input-project-relative-path-step';
import { ProjectService } from '../../service/project-service';

export class CreateProjectFlow extends BaseFlow<CreateProjectFlowConfig>
{
	getFirstStep(_config: CreateProjectFlowConfig): StepBluePrint<CreateProjectFlowConfig> {
		return {
			stepType: InputProjectNameStep,
			next: CreateProjectFlow._onProjectNameAccept,
			canceled: CreateProjectFlow._onProjectCreationCanceled
		}
	}
	
	private static _onProjectNameAccept(_config: CreateProjectFlowConfig): StepBluePrint<CreateProjectFlowConfig>
	{
		vscode.window.showInformationMessage(`Project name set: ${_config.projectName}`);

		return {
			stepType: InputProjectRelativePathStep,
			next: CreateProjectFlow._onProjectrelativePathAccept,
			canceled: CreateProjectFlow._onProjectCreationCanceled
		}
	}

	private static _onProjectrelativePathAccept(_config: CreateProjectFlowConfig): StepBluePrint<CreateProjectFlowConfig>
	{
		vscode.window.showInformationMessage(`Project name set: ${_config.projectName}`);

		return {
			stepType: SelectProjectTypeStep,
			next: CreateProjectFlow._onProjectTypeSelected,
			canceled: CreateProjectFlow._onProjectCreationCanceled
		}
	}

	private static _onProjectTypeSelected(_config: CreateProjectFlowConfig): StepBluePrint<CreateProjectFlowConfig>
	{
		vscode.window.showInformationMessage(`Project type set: ${_config.type}`);

		return {
			stepType: SelectProjectLanguageStep,
			next: CreateProjectFlow._onProjectLanguageSelected,
			canceled: CreateProjectFlow._onProjectCreationCanceled
		}
	}

	private static _onProjectLanguageSelected(_config: CreateProjectFlowConfig): StepBluePrint<CreateProjectFlowConfig>
	{
		vscode.window.showInformationMessage(`Project language set: ${JSON.stringify(_config.languages)}`);

		return {
			stepType: InputSourceDirStep,
			next: CreateProjectFlow._onProjectSourceDirSet,
			canceled: CreateProjectFlow._onProjectCreationCanceled
		}
	}

	private static _onProjectSourceDirSet(_config: CreateProjectFlowConfig): StepBluePrint<CreateProjectFlowConfig>
	{
		vscode.window.showInformationMessage(`Project source dir set: ${_config.srcDir}`);

		return {
			stepType: InputIncludeDirStep,
			next: CreateProjectFlow._onProjectIncludeDirSet,
			canceled: CreateProjectFlow._onProjectCreationCanceled
		};
	}

	private static _onProjectIncludeDirSet(_config: CreateProjectFlowConfig): StepBluePrint<CreateProjectFlowConfig>
	{
		vscode.window.showInformationMessage(`Project include dir set: ${_config.includeDir}`);

		return {
			stepType: SelectPlatformStep,
			next: CreateProjectFlow._onProjectPlatformSet,
			canceled: CreateProjectFlow._onProjectCreationCanceled
		}
	}

	private static _onProjectPlatformSet(_config: CreateProjectFlowConfig): undefined
	{
		vscode.window.showInformationMessage(`Project supported plaforms set: ${JSON.stringify(_config.platforms)}`);
		vscode.window.showInformationMessage(`Project configuration complete! Generating cmake files`);

		CreateProjectFlow._onProjectCreationFinish(_config);
		return undefined;
	}

	private static _onProjectCreationCanceled(_config: CreateProjectFlowConfig)
	{
		vscode.window.showErrorMessage('Project creation canceled');
	}

	private static _onProjectCreationFinish(_config: CreateProjectFlowConfig)
	{
		const project = CreateProjectFlow._convertFlowConfigToProject(_config);

		const projectService = new ProjectService();
		projectService.saveProject(project);
	}

	private static _convertFlowConfigToProject(_config: CreateProjectFlowConfig): Project
	{
		return {
			name: _config.projectName,
			relativePath: _config.relativePath,
			type: _config.type,
			version: '1.0.0',
			language: CreateProjectFlow._getLanguagesFromConfig(_config, '17'),
			sourceDirectory: _config.srcDir,
			includeDirectories: {
				public: [
					_config.includeDir
				], 
				private: [],
				interface: []
			},
			platform: CreateProjectFlow._getPlatformsFromConfig(_config),
		}
	}

	private static _getLanguagesFromConfig(_config: ProjectLanguageConfig, _version: string): {[key in ProjectLanguage]: string}
	{
		let result = Object.create(null);

		for (const language of _config.languages) {
			result[language] = _version;
		}

		return result;
	}

	private static _getPlatformsFromConfig(_config: CreateProjectFlowConfig): {[key in PlatformType]: Platform}
	{
		let result = Object.create(null);

		for (const platform of _config.platforms) {
			result[platform] = <Platform>{
				binary: {
					name: _config.projectName,
					useTargetSubSystem: false
				}
			};
		}
		
		return result;
	}
}