import * as vscode from 'vscode';
import { CreateProjectFlow } from './flow/create-project/create-project-flow';
import { CreateProjectFlowConfig } from './flow/create-project/create-project-flow-config';
import { FlowRunner } from './flow/flow-runner';
import { PlatformType } from './model/project/platform/platform';
import { ProjectService } from './service/project-service';



export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('cmake-helper-v2.test', () => {

		const createProjectConfig: CreateProjectFlowConfig = {
			flowName:  'Create project',
		};

		FlowRunner.executeFlow(createProjectConfig, CreateProjectFlow);

		// const service = new ProjectService();
		// service.loadProjects().then(projects => {
		// 	if(!projects)
		// 	{
		// 		vscode.window.showErrorMessage('could not load projects');
		// 		return;
		// 	}
	
		// 	const project = projects['test project'];
	
		// 	const platform = project.platform[PlatformType.WIN32];

		// 	const b = false;
		// });
	});

	context.subscriptions.push(disposable);
}

// function getProject() : Project
// {
// 	const libs: {[key: string]:  {[key: string]: Library[]}} = {};
		
// 	const projLib: Library = {
// 		name: 'test.project.lib'
// 	};

// 	projLib.includeDirectories = {};

// 	projLib.includeDirectories[Visibility.PUBLIC.toLowerCase()] = [
// 		'/dir/1',
// 		'/dir/2',
// 		'/dir/3'
// 	];

// 	projLib.includeDirectories[Visibility.PRIVATE.toLowerCase()] = [
// 		'/dir/1',
// 		'/dir/2',
// 		'/dir/3'
// 	];

// 	projLib.includeDirectories[Visibility.INTERFACE.toLowerCase()] = [
// 		'/dir/1',
// 		'/dir/2',
// 		'/dir/3'
// 	];

// 	const packLib: Library = {
// 		name: 'test.package.lib'
// 	};

// 	packLib.includeDirectories = {};

// 	packLib.includeDirectories[Visibility.PUBLIC.toLowerCase()] = [
// 		'/dir/1',
// 		'/dir/2',
// 		'/dir/3'
// 	];

// 	packLib.includeDirectories[Visibility.PRIVATE.toLowerCase()] = [
// 		'/dir/1',
// 		'/dir/2',
// 		'/dir/3'
// 	];

// 	packLib.includeDirectories[Visibility.INTERFACE.toLowerCase()] = [
// 		'/dir/1',
// 		'/dir/2',
// 		'/dir/3'
// 	];

// 	libs[Visibility.PUBLIC.toLowerCase()] = {
// 		"package": [packLib],
// 		"project": [projLib],
// 		"library": [packLib]
// 	}

// 	const project: Project = {
// 		name: 'test project',
// 		type: ProjectType.EXECUTABLE,
// 		version: '1.0.0.0',
// 		language: [
// 			{
// 				type: ProjectLanguageType.C,
// 				standardVersion: 17
// 			},
// 			{
// 				type: ProjectLanguageType.CXX,
// 				standardVersion: 17
// 			}
// 		],
// 		sourceDirectory: 'src',
// 		includeDirectory: 'include',
// 		preCompiledHeader: 'src/test.pch.h',
// 		configHeader: {
// 			input: 'input/ouput/test.config.header.h',
// 			output: 'test.config.header.h',
// 		},
// 		compileDefinitions: {
// 			"public": [
// 				'PUBLIC', 'COMPILE', 'DEFINITIONS'
// 			],
// 			"private": [
// 				'PRIVATE', 'COMPILE', 'DEFINITIONS'
// 			],
// 			"interfacee": [
// 				'INTERFACE', 'COMPILE', 'DEFINITIONS'
// 			]
// 		},
// 		libraries: libs,
// 		platform: {
// 			type: PlatformType.WIN32,
// 			binary: {
// 				name: 'windows.binary.exe',
// 				useTargetSubSystem: true
// 			},
// 			compileDefinitions: {
// 				"public": [
// 					'PUBLIC', 'COMPILE', 'DEFINITIONS'
// 				],
// 				"private": [
// 					'PRIVATE', 'COMPILE', 'DEFINITIONS'
// 				],
// 				"interfacee": [
// 					'INTERFACE', 'COMPILE', 'DEFINITIONS'
// 				]
// 			},
// 			libraries: libs				
// 		}
// 	};

// 	return project;
// }

// this method is called when your extension is deactivated
export function deactivate() {}
