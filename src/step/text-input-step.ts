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
	placeHolder: string;
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
}