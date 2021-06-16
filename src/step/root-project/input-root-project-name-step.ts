import { BaseFlowConfig } from "../../flow/base-flow-config";
import { RegexConstants } from "../../util/regex-constants";
import { RegexValidatedTextInputStep } from "../input/regex-validated-text-input-step";
import { TextInputStepConfig } from "../input/text-input-step";
import { StepNames } from "../step-names";

export interface RootProjectNameConfig extends BaseFlowConfig
{
	rootProjectName: string;
}

export class InputRootProjectNameStep<TConfig extends RootProjectNameConfig> extends RegexValidatedTextInputStep<TConfig>
{
	constructor(_config: TConfig)
	{
		super(_config, StepNames.inputRootProjectName, {
			regexString: RegexConstants.projectNameRegex,
			regexFlags: 'i',
			validationMessage: `Please input a project name conform the regex ${RegexConstants.projectNameRegex}'`,
			allowEmpty: false
		});
	}

	protected onInput(inputValue: string): void {
		this.config.rootProjectName = inputValue;
	}

	public getStepConfig(): TextInputStepConfig {
		return {
			stepTitle: this.config.flowName,
			placeHolder: 'Enter root project name',
			prompt: 'Please enter a valid root project name consisting of only a-z, A-Z, 0-9, -, _',
			ignoreFocusOut: true
		};
	}
}