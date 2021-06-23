import * as vscode from 'vscode';
import { Project } from "../../model/project/project";
import { ProjectService } from "../../service/project-service";
import { SelectProjectConfig, SelectProjectStep } from "../../step/project/select-project-step";
import { StepBluePrint } from "../../step/step-blueprint";
import { CreateProjectFlow } from "../create-project/create-project-flow";
import { CreateProjectFlowConfig } from "../create-project/create-project-flow-config";

export interface CreateSingleProjectFlowConfig extends 
	CreateProjectFlowConfig<CreateSingleProjectFlowConfig>,
	SelectProjectConfig
{
	createdProject?: Project
}

export class CreateSingleProjectFlow extends CreateProjectFlow<CreateSingleProjectFlowConfig>
{
	getFirstStep(_config: CreateSingleProjectFlowConfig): StepBluePrint<CreateSingleProjectFlowConfig> {
		return CreateSingleProjectFlow.continueProjectCreateFlow(_config, CreateSingleProjectFlow._onProjectCreationComplete);
	}

	private static _onProjectCreationComplete(_config: CreateSingleProjectFlowConfig, _project: Project): undefined
	{
		const projectService = new ProjectService();
		projectService.saveProject(_project);
		return undefined;
	}
}