import { Visibility } from "../visibility";

export enum LibraryType
{
	PROJECT = 'project',
	PACKAGE = 'package',
	LIBRARY = 'library'
}

export interface Library
{
	name: string
	includeDirectories: string[]
}