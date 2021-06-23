import { BaseFlowConfig } from "../../flow/base-flow-config";
import { RegexConstants } from "../../util/regex-constants";
import { RegexValidatedTextInputStep } from "../input/regex-validated-text-input-step";
import { TextInputStepConfig } from "../input/text-input-step";
import { StepNames } from "../step-names";
import { ProjectNameConfig } from "./input-project-name-step";

export interface ProjectRelativePathConfig extends 
	BaseFlowConfig,
	ProjectNameConfig
{
	relativePath: string;
}

export class InputProjectRelativePathStep<TFlowConfig extends ProjectRelativePathConfig> extends RegexValidatedTextInputStep<TFlowConfig>
{
	constructor(
		_config: TFlowConfig)
	{
		super(_config, StepNames.inputProjectRelativePath, {
			regexString: RegexConstants.relativeDirectoryRegex,
			regexFlags: 'gi',
			validationMessage: `Invalid input! Path should be conform regex: '${RegexConstants.relativeDirectoryRegex}'`,
			allowEmpty:  !('rootProjectName' in _config) // Only allow an empty path if we're not creating a root project aswell
		});
	}

	protected onInput(inputValue: string): void {
		if(!inputValue || inputValue == '')
		{
			this.config.relativePath = '';
			return;
		}

		this.config.relativePath = inputValue;
	}
	
	public getStepConfig(): TextInputStepConfig {

		const defaultValue: string = this.config.projectName;

		return {
			stepTitle: 'Enter relative path',
			prompt: 'Enter the relative path where the project should be saved. Empty for workspace root',
			placeHolder: 'Path (empty for workspace root)',
			defaultValue: defaultValue,
			ignoreFocusOut: true
		}
	}
}