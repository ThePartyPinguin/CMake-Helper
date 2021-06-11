import { BaseFlowConfig } from "../flow/base-flow-config";
import { StepService } from "../service/step-service";
import { StepDisplayType } from "./step-display-type";

export interface BaseStepConfig
{
	stepTitle: string;
}

export abstract class BaseStep<TFlowConfig extends BaseFlowConfig>
{
	config: TFlowConfig
	service: StepService<TFlowConfig>;

	private _stepDisplayType: StepDisplayType;

	public get stepDisplayType(): StepDisplayType {
		return this._stepDisplayType;
	}

	constructor(
		_stepDisplayType: StepDisplayType,
		_config: TFlowConfig, 
		_service: StepService<TFlowConfig>)
	{
		this._stepDisplayType = _stepDisplayType;
		this.config = _config;
		this.service = _service;
	}

	public abstract getStepConfig() : BaseStepConfig;
}