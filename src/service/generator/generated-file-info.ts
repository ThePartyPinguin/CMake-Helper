import * as vscode from "vscode";

export interface GeneratedFileInfo
{
	relativeUri: vscode.Uri,
	fileName: string,
	fileLines: string[]
}