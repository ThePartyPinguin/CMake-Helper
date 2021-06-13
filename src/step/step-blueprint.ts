import { BaseFlowConfig } from "../flow/base-flow-config";
import { BaseStep } from "./base-step";

export interface StepBluePrint<TFlowConfig extends BaseFlowConfig>
{
	stepType : (new(_config: TFlowConfig) => BaseStep<TFlowConfig>),
	next: (_config: TFlowConfig) => StepBluePrint<TFlowConfig> | undefined,
	canceled: (_config: TFlowConfig) => void
}