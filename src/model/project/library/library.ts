import { Visibility } from "../visibility";

export enum LibraryType
{
	PROJECT = 'project',
	PACKAGE = 'package',
	LIBRARY = 'library'
}

export interface Library
{
	includeDirectories?: {[key in Visibility]: string[]};
}