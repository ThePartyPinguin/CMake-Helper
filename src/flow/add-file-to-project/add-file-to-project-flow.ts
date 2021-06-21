import * as vscode from 'vscode';
import { ProjectService } from '../../service/project-service';
import { SelectProjectStep } from "../../step/project/select-project-step";
import { StepBluePrint } from "../../step/step-blueprint";
import { RegexConstants } from '../../util/regex-constants';
import { BaseFlow } from "../base-flow";
import { AddFileToProjectFlowConfig } from "./add-file-to-project-flow-config";

export class AddFileToProjectFlow extends BaseFlow<AddFileToProjectFlowConfig>
{
	getFirstStep(_config: AddFileToProjectFlowConfig): StepBluePrint<AddFileToProjectFlowConfig> {
		return {
			stepType: SelectProjectStep,
			accept: AddFileToProjectFlow._onProjectSelectAccept,
			cancel: AddFileToProjectFlow._onProjectSelectCancel
		}
	}

	private static _onProjectSelectAccept(_config: AddFileToProjectFlowConfig): undefined
	{
		const currentDocument = vscode.window.activeTextEditor?.document
		const workspaces = vscode.workspace.workspaceFolders;

		if (!currentDocument)
		{
			vscode.window.showErrorMessage('Could not get active file!');
			return;
		}

		if (!workspaces)
		{
			vscode.window.showErrorMessage('Could not get current workspace');
			return;
		}

		if(!_config.selectedProject)
		{
			vscode.window.showErrorMessage('Could not get selected project');
			return;
		}
		const selectedProject = _config.selectedProject;

		if(!selectedProject.sourceFiles)
		{
			selectedProject.sourceFiles = [];
		}

		const documentUri: vscode.Uri = currentDocument.uri;

		let relativeDocumentFsPath = vscode.workspace.asRelativePath(documentUri, false).replace(selectedProject.relativePath, '');
		
		if(relativeDocumentFsPath.startsWith('\\') || relativeDocumentFsPath.startsWith('/'))
		{
			relativeDocumentFsPath = relativeDocumentFsPath.substring(1);
		}

		var regex = new RegExp(RegexConstants.sourceFileRegex, 'gi');

		if(!regex.test(relativeDocumentFsPath))
		{
			vscode.window.showErrorMessage('Active file is not a valid source file');
			return;
		}

		const constainsFile = selectedProject.sourceFiles.findIndex(f => f == relativeDocumentFsPath) >= 0;

		if(constainsFile)
		{
			vscode.window.showErrorMessage('File already added to project');
			return;
		}

		selectedProject.sourceFiles.push(relativeDocumentFsPath);

		const projectService = new ProjectService();
		projectService.saveProject(selectedProject);
		vscode.window.showInformationMessage(`File added to: ${selectedProject.name}`);
	}

	private static _onProjectSelectCancel(_config: AddFileToProjectFlowConfig)
	{
		vscode.window.showErrorMessage('File not added');
	}
}