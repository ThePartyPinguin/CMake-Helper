import { BaseFlowConfig } from "../flow/base-flow-config";
import { BaseStep } from "../step/step-base";

export class StepService<TStepConfig extends BaseFlowConfig>
{
	createStep<TStep extends BaseStep<TStepConfig>>(
		_stepType: (new(_config: TStepConfig, _service: StepService<TStepConfig>) => TStep),

		_config: TStepConfig)
	{
		return new _stepType(_config, this);
	}
}