import { TextDecoder, TextEncoder } from 'util';
import * as vscode from 'vscode';
import { Project } from '../model/project/project';
import { CMakeFileGenerator } from './generator/cmake/cmake-file-generator';

export class ProjectService
{
	static projectFileExtension: string = '*.cmh'
	static searchPattern: string = '**/*.{cmh}';
	
	loadProjects(): Promise<{[key: string]: Project}>
	{
		return new Promise<{[key: string]: Project}>((resolve, reject) => {		

			const workSpaceFolders = vscode.workspace.workspaceFolders;

			if(!workSpaceFolders)
			{
				reject('could not get root workSpaceFolder');
				return;
			}

			const rootUri = workSpaceFolders[0].uri;

			const globSearchPattern = new vscode.RelativePattern(rootUri, ProjectService.searchPattern);
			vscode.workspace.findFiles(globSearchPattern, null).then((uris: vscode.Uri[]) => {
				const promises: Promise<Project>[] = uris.map(uri => this.readProjectFile(uri));
				Promise.all(promises).then((projectsLoadResult: Project[]) => {
					const result: {[key: string]: Project} = {};

					for (const project of projectsLoadResult) {
						result[project.name] = project;
					}

					resolve(result)
				});
			});	
		})	
	}

	saveProject(_project: Project)
	{
		const workSpaceFolders = vscode.workspace.workspaceFolders;

		if(!workSpaceFolders)
		{
			vscode.window.showErrorMessage('could not get root workSpaceFolder');
			return;
		}

		const rootUri = workSpaceFolders[0].uri;

		const generator = new CMakeFileGenerator();
		const cmakeContents = generator.generateFileContents(_project);

		let fileContents: string = '';

		for (const line of cmakeContents.fileLines) {
			fileContents += `${line}\r\n`;
		}

		const projectDir = vscode.Uri.joinPath(rootUri, cmakeContents.relativeUri.fsPath);

		this.associateFileExtensionWithJson();

		vscode.workspace.fs.createDirectory(projectDir).then(() => {

			const fileUri: vscode.Uri = vscode.Uri.joinPath(projectDir, cmakeContents.fileName);

			vscode.workspace.fs.writeFile(fileUri, new TextEncoder().encode(fileContents)).then(() => {
				vscode.window.showInformationMessage(`${_project.name} saved!`);
			});

			const indentSize: number = vscode.workspace.getConfiguration('editor').get<number>('tabSize') || 4;
			const cmhFileUri: vscode.Uri = vscode.Uri.joinPath(projectDir, `${_project.name}.cmh`);
			const cmhFileContents: string = JSON.stringify(_project, undefined, indentSize);

			vscode.workspace.fs.writeFile(cmhFileUri, new TextEncoder().encode(cmhFileContents)).then(() => {
				vscode.window.showInformationMessage(`${_project.name}.cmh saved!`);
			});
		});		
	}

	private readProjectFile(uri: vscode.Uri): Promise<Project>
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