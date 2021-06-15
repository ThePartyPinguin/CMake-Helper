import { Library, LibraryType } from "../library/library";
import { Visibility } from "../visibility";
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
	compileDefinitions?: {[key in Visibility]: string[]};
	libraries?: {[key in Visibility]: {[key in LibraryType]: {[key: string]: Library}}};
}