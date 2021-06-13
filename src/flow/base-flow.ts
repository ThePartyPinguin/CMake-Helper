import { StepBluePrint } from "../step/step-blueprint";
import { BaseFlowConfig } from "./base-flow-config";

export abstract class BaseFlow<TFlowConfig extends BaseFlowConfig>
{
	config: TFlowConfig;

	constructor(
		_config: TFlowConfig,)
	{
		this.config = _config;
	}

	abstract getFirstStep(_config: TFlowConfig): StepBluePrint<TFlowConfig>;
}