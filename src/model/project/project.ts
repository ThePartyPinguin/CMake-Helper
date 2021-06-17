import { Library, LibraryType } from "./library/library";
import { Platform, PlatformType } from "./platform/platform";
import { ProjectConfigHeaderFiles } from "./project-config-files";
import { ProjectLanguage } from "./project-language";
import { ProjectType } from "./project-type";
import { Visibility } from "./visibility";

export interface Project
{
	name: string;
	relativePath: string,
	type: ProjectType;
	version: string;
	language: {[key in ProjectLanguage]: string};
	sourceDirectory: string;
	includeDirectories: {[key in Visibility]: string[]};
	preCompiledHeader?: string;
	configHeader?: ProjectConfigHeaderFiles;
	libraries?: {[key in Visibility]: {[key in LibraryType]: string[]}};
	compileDefinitions?: {[key in Visibility]: string[]};
	platform: {[key in PlatformType]: Platform};
	sourceFiles?: string[];
}