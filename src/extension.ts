import * as vscode from 'vscode';
import { CreateSingleProjectFlow } from './flow/create-single-project/single-create-project-flow';
import { FlowConfigTemplate } from './flow/flow-config-template';
import { GenerateProjectFlow } from './flow/generate-project/generate-project-flow';
import { InitFlow } from './flow/init/init-helper-flow';
import { FlowService } from './service/flow-service';
import { ProjectService } from './service/project-service';


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
		CreateSingleProjectFlow
	);

	flowService.registerFlow(
		'cmake-helper-v2.generate',
		FlowConfigTemplate.getDefaultGenerateProjectFlowConfig,
		GenerateProjectFlow
	);
	
	ProjectService.initFileWatcher();
}

export function deactivate() {}
