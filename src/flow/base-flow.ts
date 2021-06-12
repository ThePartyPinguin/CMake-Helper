import { StepService } from "../service/step-service";
import { BaseStep } from "../step/base-step";
import { BaseFlowConfig } from "./base-flow-config";

export abstract class BaseFlow<TFlowConfig extends BaseFlowConfig>
{
	config: TFlowConfig;
	stepService: StepService<TFlowConfig>;

	constructor(
		_config: TFlowConfig, 
		_stepService: StepService<TFlowConfig>)
	{
		this.config = _config;
		this.stepService = _stepService;
	}

	abstract getFirstStep(_config: TFlowConfig): BaseStep<TFlowConfig>;
}