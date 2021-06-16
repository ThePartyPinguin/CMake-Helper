import * as vscode from 'vscode';
import { ProjectService } from "../../service/project-service";
import { SelectProjectStep } from "../../step/project/select-project-step";
import { StepBluePrint } from "../../step/step-blueprint";
import { BaseFlow } from "../base-flow"
import { GenerateProjectFlowConfig } from "./generate-project-flow-config";

export class GenerateProjectFlow extends BaseFlow<GenerateProjectFlowConfig>
{
	getFirstStep(_config: GenerateProjectFlowConfig): StepBluePrint<GenerateProjectFlowConfig> {
		return {
			stepType: SelectProjectStep,
			accept: GenerateProjectFlow._onProjectSelected,
			cancel: GenerateProjectFlow._onProjectGenerationCanceled
		}
	}

	private static _onProjectSelected(_config: GenerateProjectFlowConfig): undefined
	{
		if(!_config.selectedProject)
		{
			vscode.window.showErrorMessage('Could not generate project. No project selected!');
			return;
		}
		
		var service = new ProjectService();
		service.saveProject(_config.selectedProject);
	}

	private static _onProjectGenerationCanceled(_config: GenerateProjectFlowConfig)
	{

	}
}