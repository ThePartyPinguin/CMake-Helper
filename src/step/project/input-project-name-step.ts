import { BaseFlowConfig } from "../../flow/base-flow-config";
import { TextInputStep, TextInputStepConfig } from "../input/text-input-step";
import { StepNames } from "../step-names";

export interface ProjectNameConfig extends BaseFlowConfig
{
	projectName: string;
}

export class InputProjectNameStep<TConfig extends ProjectNameConfig> extends TextInputStep<TConfig>
{
	private static _validRegexString: string = '^[0-9a-z-=\.]+$';

	private _validateRegex: RegExp;
	constructor(
		_config: TConfig)
	{
		super(_config, StepNames.inputProjectName);
		this._validateRegex = new RegExp(InputProjectNameStep._validRegexString, 'i');
	}

	getStepConfig(): TextInputStepConfig {
		return {
			stepTitle: this.config.flowName,
			placeHolder: 'Enter project name',
			prompt: 'Please enter a valid project name constisting of only a-z, A-Z, 0-9, -, _',
			ignoreFocusOut: true
		};
	}

	validateInput(inputValue: string): string | true {

		if(this._validateRegex.test(inputValue))
		{
			return true;
		}

		return `Please input a project name conform the regex /${InputProjectNameStep._validRegexString}/`;
	}
	protected onInput(inputValue: string): void {
		this.config.projectName = inputValue;
	}
}