import * as vscode from 'vscode';
import { Project } from '../project/project';

export interface RegistryProject
{
	uri: vscode.Uri;
	project: Project;
}