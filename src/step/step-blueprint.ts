import { BaseFlowConfig } from "../flow/base-flow-config";
import { BaseStep, BaseStepConfig } from "./base-step";

export interface StepBluePrint<TFlowConfig extends BaseFlowConfig>
{
	stepType : (new(_config: TFlowConfig) => BaseStep<TFlowConfig, BaseStepConfig>),
	accept?: (_config: TFlowConfig) => StepBluePrint<TFlowConfig> | undefined,
	cancel: (_config: TFlowConfig) => void,
}