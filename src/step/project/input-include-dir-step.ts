import { BaseFlowConfig } from "../../flow/base-flow-config";
import { RegexConstants } from "../../util/regex-constants";
import { RegexValidatedTextInputStep } from "../input/regex-validated-text-input-step";
import { TextInputStepConfig } from "../input/text-input-step";
import { StepNames } from "../step-names";

export interface IncludeDirConfig extends BaseFlowConfig
{
	includeDir: string;
}

export class InputIncludeDirStep<TFlowConfig extends IncludeDirConfig> extends RegexValidatedTextInputStep<TFlowConfig>
{
	constructor(_config: TFlowConfig)
	{
		super(_config, StepNames.inputIncludeDir, {
			regexString: RegexConstants.relativeDirectoryRegex,
			regexFlags: 'gi',
			validationMessage: `Invalid input! Path should be conform regex: '${RegexConstants.relativeDirectoryRegex}'`,
			allowEmpty: true
		});
	}

	protected onInput(inputValue: string): void {
		if(!inputValue || inputValue == '')
		{
			this.config.includeDir = 'include';
			return;
		}

		this.config.includeDir = inputValue;
	}

	public getStepConfig(): TextInputStepConfig {
		return {
			stepTitle: 'Include directory',
			placeHolder: 'Enter directory',
			prompt: 'Set the directory of the project\'s source files. Keep empty to keep default directory (include)',
			ignoreFocusOut: true
		}
	}	
}