import { BaseFlowConfig } from "../../flow/base-flow-config";
import { RegexConstants } from "../../util/regex-constants";
import { RegexValidatedTextInputStep } from "../input/regex-validated-text-input-step";
import { TextInputStepConfig } from "../input/text-input-step";
import { StepNames } from "../step-names";

export interface RootProjectBinaryDir extends BaseFlowConfig
{
	rootProjectDirectory: string
}

export class InputRootProjectDirStep<TFlowConfig extends RootProjectBinaryDir> extends RegexValidatedTextInputStep<TFlowConfig>
{
	constructor(_config: TFlowConfig)
	{
		super(_config, StepNames.inputRootProjectBinaryDir, {
			regexString: RegexConstants.relativeDirectoryRegex,
			regexFlags: 'gi',
			validationMessage: `Invalid input! Path should be conform regex: '${RegexConstants.relativeDirectoryRegex}'`,
			allowEmpty: true
		})
	}
	
	protected onInput(inputValue: string): void {
		this.config.rootProjectDirectory = inputValue;
	}

	public getStepConfig(): TextInputStepConfig {
		return {
			stepTitle: 'Create root project',
			prompt: 'Enter the relative path where the project should be saved. Empty for default (bin)',
			placeHolder: 'Path (empty for workspace root)',
			ignoreFocusOut: true
		}
	}
}