import { BaseFlowConfig } from "../../flow/base-flow-config";
import { StepService } from "../../service/step-service";
import { BaseStep, BaseStepConfig } from "../base-step";
import { StepDisplayType } from "../step-display-type";


export interface TextInputStepConfig extends BaseStepConfig
{
	prompt: string
}

export abstract class TextInputStep<TFlowConfig extends BaseFlowConfig> extends BaseStep<TFlowConfig>
{
	inputKey: string;

	constructor(
		_config: TFlowConfig, 
		_service: StepService<TFlowConfig>,
		_inputKey: string)
	{
		super(StepDisplayType.TEXT_INPUT, _config, _service);
		this.inputKey = _inputKey;
	}

	setInputValue(inputValue: string): void
	{
		this.onInput(inputValue);
	}

	abstract validateInput(inputValue: string): true | string;

	protected abstract onInput(inputValue: string): void;
}