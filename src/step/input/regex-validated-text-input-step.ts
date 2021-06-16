import { BaseFlowConfig } from "../../flow/base-flow-config";
import { TextInputStep } from "./text-input-step";

export interface RegexStepSettings
{
	regexString: string,
	validationMessage?: string,
	allowEmpty?: boolean,
	regexFlags?: string
}

export abstract class RegexValidatedTextInputStep<TFlowConfig extends BaseFlowConfig> extends TextInputStep<TFlowConfig>
{
	private _regex: RegExp;
	private _regexString: string;
	private _settings: RegexStepSettings;

	constructor(
		_config: TFlowConfig,
		_stepName: string,
		_settings: RegexStepSettings)
	{
		super(_config, _stepName);
		this._settings = _settings;
		this._regexString = _settings.regexString;
		this._regex = new RegExp(_settings.regexString, _settings.regexFlags);
	}

	validateInput(inputValue: string): string | true {

		if(this._settings.allowEmpty)
		{
			if(!inputValue || inputValue == '')
			{
				return true;
			}
		}	

		const valid = this._regex.test(inputValue);

		if(valid)
		{
			return true;
		}

		if(this._settings.validationMessage)
		{
			return this._settings.validationMessage;
		}

		return `Invalid input! Input should be conform: '${this._regexString}'`
	}
}