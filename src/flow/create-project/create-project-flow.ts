import { BaseStep } from "../../step/step-base";
import { BaseFlow } from "../base-flow";
import { CreateProjectFlowConfig } from "./create-project-flow-config";
import { InputProjectNameStep } from "../../step/project/input-project-name-step";

export class CreateProjectFlow extends BaseFlow<CreateProjectFlowConfig>
{
	getFirstStep(_config: CreateProjectFlowConfig): BaseStep<CreateProjectFlowConfig> {
		return this.stepService.createStep(
			InputProjectNameStep,
			_config
		)
	}		
}