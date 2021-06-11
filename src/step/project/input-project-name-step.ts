import { StepService } from "../../service/step-service";
import {  BaseStepConfig } from "../step-base";
import { TextInputStep, TextInputFlowConfig, TextInputStepConfig } from "../text-input-step";

export interface ProjectNameConfig extends TextInputFlowConfig
{
	projectName?: string;
}

export class InputProjectNameStep<TConfig extends ProjectNameConfig> extends TextInputStep<TConfig>
{
	private static _validRegexString: string = '^[0-9a-z-=]+$';

	private _validateRegex: RegExp;
	constructor(
		_config: TConfig, 
		_service: StepService<TConfig>)
	{
		super(_config, _service, 'project-name');
		this._validateRegex = new RegExp(InputProjectNameStep._validRegexString, 'i');
	}

	getStepConfig(): BaseStepConfig {
		return <TextInputStepConfig>{
			stepTitle: this.config.flowName,
			placeHolder: 'Enter project name',
			prompt: 'Please enter a valid project name constisting of only a-z, A-Z, 0-9, -, _'
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