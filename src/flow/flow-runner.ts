import { StepService } from "../service/step-service";
import { BaseStep, BaseStepConfig } from "../step/step-base";
import { StepDisplayType } from "../step/step-display-type";
import { TextInputFlowConfig, TextInputStep } from "../step/text-input-step";
import { BaseFlow } from "./base-flow";
import { BaseFlowConfig } from "./base-flow-config";

export class FlowRunner
{
	static executeFlow<TConfig extends BaseFlowConfig, TFlow extends BaseFlow<TConfig>>(
		_config: TConfig,
		_flowType: (new(_config: TConfig, _service: StepService<TConfig>) => TFlow))
	{
		const stepService = new StepService<TConfig>();

		const flow = new _flowType(_config, stepService);

		const firstStep = flow.getFirstStep(_config);

		this._displayStep<TConfig>(firstStep);
	}

	private static _displayStep<TConfig extends BaseFlowConfig>(_step: BaseStep<TConfig>)
	{
		const displayType = _step.stepDisplayType;

		switch(displayType)
		{
			case StepDisplayType.TEXT_INPUT:
			{
				this._displayTextInputStep(<TextInputStep<any>>_step)
			}
		}
	}

	private static _displayTextInputStep<TConfig extends TextInputFlowConfig>(_step: TextInputStep<TConfig>)
	{
		const config = _step.getStepConfig();

	}
}