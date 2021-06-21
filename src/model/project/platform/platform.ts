import { Library } from "../library/library";
import { Package } from "../package/package";
import { PlatformBinary } from "./platform-binary";

export enum PlatformType
{
	universal = "universal",
	unix = "unix",
	win32 = "win32",
	apple = "apple"
}

export interface Platform
{
	binary: PlatformBinary;
	compileDefinitions?: string[];
	includeDirectories?: string[];	
	projectLinks?: string[],
	packages?: Package[],
	libraries?: Library[];
	childProjects?: string[];
}