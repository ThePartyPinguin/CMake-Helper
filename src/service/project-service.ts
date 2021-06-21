import { TextDecoder, TextEncoder } from 'util';
import * as vscode from 'vscode';
import { Project } from '../model/project/project';
import { CMakeGeneratorHelper } from './generator/cmake/cmake-generator-helper';
import { ProjectCMakeFileGenerator } from './generator/cmake/project-cmake-file-generator';
import { GeneratedFileInfo } from './generator/generated-file-info';

export class ProjectService
{
	static projectFileExtension: string = '*.cmh'
	static searchPattern: string = '**/*.{cmh}';
	
	static initFileWatcher()
	{
		const workSpaceFolders = vscode.workspace.workspaceFolders;

		if(!workSpaceFolders)
		{
			vscode.window.showErrorMessage('Could not create file watchers for CMakeHelper');
			return;
		}

		const rootUri = workSpaceFolders[0].uri;

		const globSearchPattern = new vscode.RelativePattern(rootUri, ProjectService.searchPattern);

		const watcher = vscode.workspace.createFileSystemWatcher(globSearchPattern, true, false, true);
		watcher.onDidChange(uri => ProjectService._onFileChanged(uri));
	}

	private static _onFileChanged(uri: vscode.Uri)
	{
		const serviceInstance = new ProjectService();
		serviceInstance.readProjectFile(uri).then(project => {
			serviceInstance.saveProject(project, true);
		});
	}

	loadProjects(): Promise<{[key: string]: Project }>
	{
		return new Promise<{[key: string]: Project }>((resolve, reject) => {		

			const workSpaceFolders = vscode.workspace.workspaceFolders;

			if(!workSpaceFolders)
			{
				reject('could not get root workSpaceFolder');
				return;
			}

			const rootUri = workSpaceFolders[0].uri;

			const globSearchPattern = new vscode.RelativePattern(rootUri, ProjectService.searchPattern);
			vscode.workspace.findFiles(globSearchPattern, null).then((uris: vscode.Uri[]) => {
				const promises: Promise<Project >[] = uris.map(uri => this.readProjectFile(uri));
				Promise.all(promises).then((projectsLoadResult: (Project )[]) => {
					const result: {[key: string]: Project } = {};

					for (const project of projectsLoadResult) {
						result[project.name] = project;
					}

					resolve(result)
				});
			});	
		})	
	}

	saveProject(_project: Project, _onlyGeneratedFiles: boolean = false)
	{
		const generator = new ProjectCMakeFileGenerator();
		const cmakeContents: GeneratedFileInfo = {
			fileLines: generator.generateFileLines(_project, CMakeGeneratorHelper.formatVarSafeString(_project.name)),
			fileName: 'CMakeLists.txt',
			relativeUri: vscode.Uri.parse(_project.relativePath)
		};

		this.save(_project.name, cmakeContents, _project, _onlyGeneratedFiles);	
	}

	// saveRootProject(_project: RootProject, _onlyGeneratedFiles: boolean = false)
	// {
	// 	const generator = new RootProjectCMakeFileGenerator();
	// 	const cmakeContents: GeneratedFileInfo = {
	// 		fileLines: generator.generateFileLines(_project, CMakeGeneratorHelper.formatVarSafeString(_project.name)),
	// 		fileName: 'CMakeLists.txt',
	// 		relativeUri: vscode.Uri.parse('')
	// 	};

	// 	this.save(_project.name, cmakeContents, _project, _onlyGeneratedFiles);
	// }

	private save(_name: string, _fileContents: GeneratedFileInfo, _project: Project , _onlyGeneratedFiles: boolean = false): void
	{
		const workSpaceFolders = vscode.workspace.workspaceFolders;

		if(!workSpaceFolders)
		{
			vscode.window.showErrorMessage('could not get root workSpaceFolder');
			return;
		}

		const rootUri = workSpaceFolders[0].uri;

		const projectDir = vscode.Uri.joinPath(rootUri, _fileContents.relativeUri.fsPath);

		this.associateFileExtensionWithJson();

		vscode.workspace.fs.createDirectory(projectDir).then(() => {
			this.saveCMakeFile(_name, _fileContents, projectDir);

			if(!_onlyGeneratedFiles)
			{
				this.saveCmhFile(_name, _project, projectDir);
			}
		});
	}

	private saveCMakeFile(_name: string, _fileContents: GeneratedFileInfo, _directoryUri: vscode.Uri)
	{
		const fileUri: vscode.Uri = vscode.Uri.joinPath(_directoryUri, _fileContents.fileName);

		let finalFileContents: string = '';

		for (const line of _fileContents.fileLines) {
			finalFileContents += `${line}\r\n`;
		}

		vscode.workspace.fs.writeFile(fileUri, new TextEncoder().encode(finalFileContents)).then(() => {
			vscode.window.showInformationMessage(`${_name} saved!`);
		});
	}

	private saveCmhFile(_name: string, _project: Project , _directoryUri: vscode.Uri): void
	{
		const indentSize: number = vscode.workspace.getConfiguration('editor').get<number>('tabSize') || 4;
		const cmhFileUri: vscode.Uri = vscode.Uri.joinPath(_directoryUri, `${_name}.cmh`);
		const cmhFileContents: string = JSON.stringify(_project, undefined, indentSize);

		vscode.workspace.fs.writeFile(cmhFileUri, new TextEncoder().encode(cmhFileContents)).then(() => {
			vscode.window.showInformationMessage(`${_name}.cmh saved!`);
		});
	}

	private readProjectFile(uri: vscode.Uri): Promise<Project >
	{
		return new Promise<Project>((resolve) => {
			vscode.workspace.fs.readFile(uri).then((data: Uint8Array) => {
				resolve(JSON.parse(new TextDecoder().decode(data)))
			});
		});
	}

	private associateFileExtensionWithJson()
	{
		// Assotiate the '.cmh' extension with json so it has the correct syntax highlighting
		let fileAssotiations: any = vscode.workspace.getConfiguration('files').get('associations') || {};
		fileAssotiations[ProjectService.projectFileExtension] = 'json';
		vscode.workspace.getConfiguration('files').update('associations', fileAssotiations);
	}
}