import { Project } from "../../model/project/project";
import { ProjectService } from "../../service/project-service";
import { StepBluePrint } from "../../step/step-blueprint";
import { CreateProjectFlow } from "../create-project/create-project-flow";
import { CreateProjectFlowConfig } from "../create-project/create-project-flow-config";

export interface CreateSingleProjectFlowConfig extends CreateProjectFlowConfig<CreateSingleProjectFlowConfig>
{
}

export class CreateSingleProjectFlow extends CreateProjectFlow<CreateSingleProjectFlowConfig>
{
	getFirstStep(_config: CreateSingleProjectFlowConfig): StepBluePrint<CreateSingleProjectFlowConfig> {
		return CreateSingleProjectFlow.continueProjectCreateFlow(_config, CreateSingleProjectFlow._onProjectCreationComplete);
	}

	private static _onProjectCreationComplete(_config: CreateSingleProjectFlowConfig, _project: Project): void
	{
		const projectService = new ProjectService();
		projectService.saveProject(_project);
	}
}