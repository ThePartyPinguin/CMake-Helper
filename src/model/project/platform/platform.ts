import { Library, LibraryType } from "../library/library";
import { Visibility } from "../visibility";
import { PlatformBinary } from "./platform-binary";

export enum PlatformType
{
	UNIVERSAL = "UNIVERSAL",
	UNIX = "UNIX",
	WIN32 = "WIN32",
	APPLE = "APPLE"
}

export interface Platform
{
	binary: PlatformBinary;
	compileDefinitions?: {[key in Visibility]: string[]};
	libraries?: {[key in Visibility]: {[key in LibraryType]: {[key: string]: Library}}};
}