import * as vscode from 'vscode';
import { CommandConstants } from './command-constants';
import { CreateProjectFlow } from './flow/create-project/create-project-flow';
import { CreateProjectFlowConfig } from './flow/create-project/create-project-flow-config';
import { FlowRunner } from './flow/flow-runner';
import { GenerateProjectFlow } from './flow/generate-project/generate-project-flow';
import { GenerateProjectFlowConfig } from './flow/generate-project/generate-project-flow-config';
import { ProjectType } from './model/project/project-type';
import { ProjectService } from './service/project-service';



export function activate(context: vscode.ExtensionContext) {
	let testCommand = vscode.commands.registerCommand(CommandConstants.create.command, () => {

		const createProjectConfig: CreateProjectFlowConfig = {
			flowName:  'Create project',
			projectName: '',
			relativePath: '',
			type: ProjectType.EXECUTABLE,
			languages: [],
			srcDir: '',
			includeDir: '',
			platforms: []
		};

		FlowRunner.executeFlow(createProjectConfig, CreateProjectFlow);
	});

	context.subscriptions.push(testCommand);

	let generateCommand = vscode.commands.registerCommand(CommandConstants.generate.command, () => {

		const projectService = new ProjectService();

		projectService.loadProjects().then(projects => {

			const generateProjectConfig: GenerateProjectFlowConfig = {
				flowName: 'Generate project',
				existingProjects: projects
			};

			FlowRunner.executeFlow(generateProjectConfig, GenerateProjectFlow);
		});
	});

	context.subscriptions.push(generateCommand);
}

export function deactivate() {}
