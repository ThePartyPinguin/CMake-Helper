import { Library, LibraryType } from "./library/library";
import { Platform, PlatformType } from "./platform/platform";
import { ProjectConfigHeaderFiles } from "./project-config-files";
import { ProjectLanguage } from "./project-language";
import { ProjectType } from "./project-type";
import { Visibility } from "./visibility";

export interface Project
{
	name: string;
	type: ProjectType;
	version: string;
	language: {[key in ProjectLanguage]: string};
	sourceDirectory: string;
	includeDirectory: string;
	preCompiledHeader?: string;
	configHeader?: ProjectConfigHeaderFiles;
	libraries?: {[key in Visibility]:  {[key in LibraryType]: Library[]}};
	compileDefinitions?: {[key: string]: string[]};
	platform: {[key in PlatformType]: Platform};
}