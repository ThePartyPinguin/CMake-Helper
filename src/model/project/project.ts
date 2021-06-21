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
	version: string;
	language: {[key in ProjectLanguage]: number};
	isRootProject?: boolean;
	platform?: {[key in PlatformType]: Platform};
	
	projectLinks?: string[],
	packages?: Package[],
	libraries?: Library[];
	compileDefinitions?: string[];

	type?: ProjectType;
	preCompiledHeader?: string;
	configHeader?: ProjectConfigHeaderFiles;

	sourceDirectory?: string;
	includeDirectories?: string[];
	sourceFiles?: string[];

	outputDirectory?: string;
	childProjects?: string[];
}