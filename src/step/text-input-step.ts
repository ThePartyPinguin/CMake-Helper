import { BaseFlowConfig } from "../flow/base-flow-config";
import { StepService } from "../service/step-service";
import { BaseStep, BaseStepConfig } from "./step-base";
import { StepDisplayType } from "./step-display-type";

export interface TextInputFlowConfig extends BaseFlowConfig
{
	textInput?: {[key: string]: string};
}

export interface TextInputStepConfig extends BaseStepConfig
{
	placeHolder: string,
	prompt: string
}

export abstract class TextInputStep<TConfig extends TextInputFlowConfig> extends BaseStep<TConfig>
{
	inputKey: string;

	constructor(
		_config: TConfig, 
		_service: StepService<TConfig>,
		_inputKey: string)
	{
		super(StepDisplayType.TEXT_INPUT, _config, _service);
		this.inputKey = _inputKey;
	}

	setInputValue(inputValue: string): void
	{
		if(!this.config.textInput)
		{
			this.config.textInput = {};
		}

		this.config.textInput[this.inputKey] = inputValue;
		this.onInput(inputValue);
	}

	abstract validateInput(inputValue: string): true | string;

	protected abstract onInput(inputValue: string): void;
}