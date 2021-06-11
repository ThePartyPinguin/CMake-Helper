import { BaseFlowConfig } from "../flow/base-flow-config";
import { BaseStep } from "../step/step-base";

export class StepService<TFlowConfig extends BaseFlowConfig>
{
	createStep<TStep extends BaseStep<TFlowConfig>>(
		_stepType: (new(_config: TFlowConfig, _service: StepService<TFlowConfig>) => TStep),
		_next: (_config: TFlowConfig) => BaseStep<TFlowConfig> | void,
		_canceled: (_config: TFlowConfig) => void,
		_config: TFlowConfig)
	{
		const step = new _stepType(_config, this);
		step.getNextStep = _next;
		step.onCanceled = _canceled
		return step;
	}
}