import { BaseFlowConfig } from "../../flow/base-flow-config";
import { BaseStep, BaseStepConfig } from "../base-step";
import { StepDisplayType } from "../step-display-type";


export interface TextInputStepConfig extends BaseStepConfig
{
	prompt: string,
	defaultValue?: string
}

export abstract class TextInputStep<TFlowConfig extends BaseFlowConfig> extends BaseStep<TFlowConfig, TextInputStepConfig>
{
	constructor(
		_config: TFlowConfig,
		_stepName: string)
	{
		super(StepDisplayType.TEXT_INPUT, _config, _stepName);
	}

	setInputValue(inputValue: string): void
	{
		this.onInput(inputValue);
	}

	abstract validateInput(inputValue: string): true | string;

	protected abstract onInput(inputValue: string): void;
}