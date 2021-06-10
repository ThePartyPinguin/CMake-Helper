import { TextDecoder } from 'util';
import * as vscode from 'vscode';
import { Project } from '../model/project/project';

export class ProjectService
{
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

	private readProjectFile(uri: vscode.Uri): Promise<Project>
	{
		return new Promise<Project>((resolve) => {
			vscode.workspace.fs.readFile(uri).then((data: Uint8Array) => {
				resolve(JSON.parse(new TextDecoder().decode(data)))
			});
		});
	}
}