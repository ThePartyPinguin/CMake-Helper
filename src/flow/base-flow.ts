import { StepService } from "../service/step-service";
import { BaseStep } from "../step/step-base";
import { BaseFlowConfig } from "./base-flow-config";

export abstract class BaseFlow<TConfig extends BaseFlowConfig>
{
	config: TConfig;
	stepService: StepService<TConfig>;

	constructor(
		_config: TConfig, 
		_stepService: StepService<TConfig>)
	{
		this.config = _config;
		this.stepService = _stepService;
	}

	abstract getFirstStep(_config: TConfig): BaseStep<TConfig>;
}