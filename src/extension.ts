import * as vscode from 'vscode';
import { CreateProjectFlow } from './flow/create-project/create-project-flow';
import { CreateProjectFlowConfig } from './flow/create-project/create-project-flow-config';
import { GenerateProjectFlow } from './flow/generate-project/generate-project-flow';
import { GenerateProjectFlowConfig } from './flow/generate-project/generate-project-flow-config';
import { ProjectType } from './model/project/project-type';
import { FlowService } from './service/flow-service';
import { ProjectService } from './service/project-service';


export function getDefaultCreateProjectFlowConfig(): CreateProjectFlowConfig
{
	return {
		flowName:  'Create project',
		projectName: '',
		relativePath: '',
		type: ProjectType.EXECUTABLE,
		languages: [],
		srcDir: '',
		includeDir: '',
		platforms: []
	};
}

export function getDefaultGenerateProjectFlowConfig(): Promise<GenerateProjectFlowConfig>
{
	return new Promise<GenerateProjectFlowConfig>((resolve) => {
		const projectService = new ProjectService();

		projectService.loadProjects().then(projects => {

			const generateProjectConfig: GenerateProjectFlowConfig = {
				flowName: 'Generate project',
				existingProjects: projects
			};

			resolve(generateProjectConfig);
		});
	})
}

export function activate(_context: vscode.ExtensionContext) {

	const flowService = new FlowService(_context)

	flowService.registerFlow(
		'cmake-helper-v2.create-project',
		getDefaultCreateProjectFlowConfig,
		CreateProjectFlow
	);

	flowService.registerFlow(
		'cmake-helper-v2.generate',
		getDefaultGenerateProjectFlowConfig,
		GenerateProjectFlow
	);
}

export function deactivate() {}
