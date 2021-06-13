import { SelectProjectStep } from "../../step/project/select-project-step";
import { StepBluePrint } from "../../step/step-blueprint";
import { BaseFlow } from "../base-flow"
import { GenerateProjectFlowConfig } from "./generate-project-flow-config";

export class GenerateProjectFlow extends BaseFlow<GenerateProjectFlowConfig>
{
	getFirstStep(_config: GenerateProjectFlowConfig): StepBluePrint<GenerateProjectFlowConfig> {
		return {
			stepType: SelectProjectStep,
			next: GenerateProjectFlow._onProjectSelected,
			canceled: GenerateProjectFlow._onProjectGenerationCanceled
		}
	}

	private static _onProjectSelected(_config: GenerateProjectFlowConfig): undefined
	{
		return undefined;		
	}

	private static _onProjectGenerationCanceled(_config: GenerateProjectFlowConfig)
	{

	}
}