// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Library } from './model/project/library/library';
import { PlatformType } from './model/project/platform/platform';
import { Project } from './model/project/project';
// import { ProjectLanguageType } from './model/project/project-language';
import { ProjectType } from './model/project/project-type';
import { Visibility } from './model/project/visibility';
import { ProjectService } from './service/project-service';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cmake-helper-v2" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('cmake-helper-v2.test', () => {

		const service = new ProjectService();
		service.loadProjects().then(projects => {
			if(!projects)
			{
				vscode.window.showErrorMessage('could not load projects');
				return;
			}
	
			const project = projects['test project'];
	
			const platform = project.platform[PlatformType.WIN32];

			const b = false;
		});

		
		// let cache: any = []

		// const jsonString: string = JSON.stringify(project, (key, value) => {
		// 	if(typeof value === 'object' && value !== null)
		// 	{
		// 		if(cache.includes(value))
		// 		{
		// 			return;
		// 		}

		// 		cache.push(value);
		// 	}

		// 	return value;
		// }, 4);

		// cache = null;

		// const workSpaceFolders = vscode.workspace.workspaceFolders;

        // if(!workSpaceFolders)
        // {
        //     return undefined;
        // }

        // const rootPath = vscode.Uri.joinPath(workSpaceFolders[0].uri, 'test-project.cmh').fsPath;

		// if(!fs.existsSync(rootPath))
		// {
		// 	const stream = fs.createWriteStream(rootPath);
		// 	const written = stream.write(jsonString);
		// 	stream.close();
		// }
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
