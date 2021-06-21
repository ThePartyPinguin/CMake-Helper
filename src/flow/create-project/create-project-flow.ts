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

export abstract class CreateProjectFlow<TFlowConfig extends CreateProjectFlowConfig<TFlowConfig>> extends BaseFlow<TFlowConfig>
{
	protected static continueProjectCreateFlow<TFlowConfig extends CreateProjectFlowConfig<TFlowConfig>>(
		_config: TFlowConfig,
		_onCreationComplete: (_config: TFlowConfig, _project: Project) => void): StepBluePrint<TFlowConfig> {

		_config.onCreationComplete = _onCreationComplete;

		return {
			stepType: InputProjectNameStep,
			accept: CreateProjectFlow._onProjectNameAccept,
			cancel: CreateProjectFlow._onProjectCreationCanceled
		}
	}
	
	private static _onProjectNameAccept<TFlowConfig extends CreateProjectFlowConfig<TFlowConfig>>(_config: TFlowConfig): StepBluePrint<TFlowConfig>
	{
		vscode.window.showInformationMessage(`Project name set: ${_config.projectName}`);

		return {
			stepType: InputProjectRelativePathStep,
			accept: CreateProjectFlow._onProjectrelativePathAccept,
			cancel: CreateProjectFlow._onProjectCreationCanceled
		}
	}

	private static _onProjectrelativePathAccept<TFlowConfig extends CreateProjectFlowConfig<TFlowConfig>>(_config: TFlowConfig): StepBluePrint<TFlowConfig>
	{
		vscode.window.showInformationMessage(`Project name set: ${_config.projectName}`);

		return {
			stepType: SelectProjectTypeStep,
			accept: CreateProjectFlow._onProjectTypeSelected,
			cancel: CreateProjectFlow._onProjectCreationCanceled
		}
	}

	private static _onProjectTypeSelected<TFlowConfig extends CreateProjectFlowConfig<TFlowConfig>>(_config: TFlowConfig): StepBluePrint<TFlowConfig>
	{
		vscode.window.showInformationMessage(`Project type set: ${_config.type}`);

		return {
			stepType: SelectProjectLanguageStep,
			accept: CreateProjectFlow._onProjectLanguageSelected,
			cancel: CreateProjectFlow._onProjectCreationCanceled
		}
	}

	private static _onProjectLanguageSelected<TFlowConfig extends CreateProjectFlowConfig<TFlowConfig>>(_config: TFlowConfig): StepBluePrint<TFlowConfig>
	{
		vscode.window.showInformationMessage(`Project language set: ${JSON.stringify(_config.languages)}`);

		return {
			stepType: InputSourceDirStep,
			accept: CreateProjectFlow._onProjectSourceDirSet,
			cancel: CreateProjectFlow._onProjectCreationCanceled
		}
	}

	private static _onProjectSourceDirSet<TFlowConfig extends CreateProjectFlowConfig<TFlowConfig>>(_config: TFlowConfig): StepBluePrint<TFlowConfig>
	{
		vscode.window.showInformationMessage(`Project source dir set: ${_config.srcDir}`);

		return {
			stepType: InputIncludeDirStep,
			accept: CreateProjectFlow._onProjectIncludeDirSet,
			cancel: CreateProjectFlow._onProjectCreationCanceled
		};
	}

	private static _onProjectIncludeDirSet<TFlowConfig extends CreateProjectFlowConfig<TFlowConfig>>(_config: TFlowConfig): StepBluePrint<TFlowConfig>
	{
		vscode.window.showInformationMessage(`Project include dir set: ${_config.includeDir}`);

		return {
			stepType: SelectPlatformStep,
			accept: CreateProjectFlow._onProjectPlatformSet,
			cancel: CreateProjectFlow._onProjectCreationCanceled
		}
	}

	private static _onProjectPlatformSet<TFlowConfig extends CreateProjectFlowConfig<TFlowConfig>>(_config: TFlowConfig): undefined
	{
		vscode.window.showInformationMessage(`Project supported plaforms set: ${JSON.stringify(_config.platforms)}`);
		vscode.window.showInformationMessage(`Project configuration complete! Generating cmake files`);

		CreateProjectFlow._onProjectCreationFinish(_config);
		return undefined;
	}

	private static _onProjectCreationCanceled<TFlowConfig extends CreateProjectFlowConfig<TFlowConfig>>(_config: TFlowConfig)
	{
		vscode.window.showErrorMessage('Project creation canceled');
	}

	private static _onProjectCreationFinish<TFlowConfig extends CreateProjectFlowConfig<TFlowConfig>>(_config: TFlowConfig)
	{
		const project = CreateProjectFlow._convertFlowConfigToProject(_config);

		if(!_config.onCreationComplete)
		{
			vscode.window.showErrorMessage('Could not complete project creation, no onCreationComplete callback was defined!');
			return;
		}

		_config.onCreationComplete(_config, project);
	}

	private static _convertFlowConfigToProject<TFlowConfig extends CreateProjectFlowConfig<TFlowConfig>>(_config: TFlowConfig): Project
	{
		return {
			name: _config.projectName,
			relativePath: _config.relativePath,
			type: _config.type,
			version: '1.0.0',
			language: CreateProjectFlow._getLanguagesFromConfig(_config, 11),
			sourceDirectory: _config.srcDir,
			includeDirectories: [
				_config.includeDir
			],
			platform: CreateProjectFlow._getPlatformsFromConfig(_config),
		}
	}

	private static _getLanguagesFromConfig(_config: ProjectLanguageConfig, _version: number): {[key in ProjectLanguage]: number}
	{
		let result = Object.create(null);

		for (const language of _config.languages) {
			result[language] = _version;
		}

		return result;
	}

	private static _getPlatformsFromConfig<TFlowConfig extends CreateProjectFlowConfig<TFlowConfig>>(_config: TFlowConfig): {[key in PlatformType]: Platform}
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