import { Library } from "./library/library";
import { Package } from "./package/package";
import { Platform, PlatformType } from "./platform/platform";
import { ProjectConfigHeaderFiles } from "./project-config-files";
import { ProjectLanguage } from "./project-language";
import { ProjectType } from "./project-type";

export interface Project
{
	name: string;
	relativePath: string,
	type: ProjectType;
	version: string;
	language: {[key in ProjectLanguage]: string};
	preCompiledHeader?: string;
	configHeader?: ProjectConfigHeaderFiles;
	sourceDirectory: string;
	includeDirectories?: string[];
	projectLinks?: string[],
	packages?: Package[],
	libraries?: Library[];
	compileDefinitions?: string[];
	platform: {[key in PlatformType]: Platform};
	sourceFiles?: string[];
}