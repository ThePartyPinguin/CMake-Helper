import * as vscode from 'vscode';
import { CreateProjectFlow } from './flow/create-project/create-project-flow';
import { FlowConfigTemplate } from './flow/flow-config-template';
import { GenerateProjectFlow } from './flow/generate-project/generate-project-flow';
import { InitFlow } from './flow/init/init-helper-flow';
import { FlowService } from './service/flow-service';


export function activate(_context: vscode.ExtensionContext) {

	const flowService = new FlowService(_context)

	flowService.registerFlow(
		'cmake-helper-v2.init',
		FlowConfigTemplate.getDefaultInitFlowConfig,
		InitFlow
	);

	flowService.registerFlow(
		'cmake-helper-v2.create-project',
		FlowConfigTemplate.getDefaultCreateProjectFlowConfig,
		CreateProjectFlow
	);

	flowService.registerFlow(
		'cmake-helper-v2.generate',
		FlowConfigTemplate.getDefaultGenerateProjectFlowConfig,
		GenerateProjectFlow
	);
}

export function deactivate() {}
