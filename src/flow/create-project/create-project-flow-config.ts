import { IncludeDirConfig } from "../../step/project/input-include-dir-step";
import { ProjectNameConfig } from "../../step/project/input-project-name-step";
import { ProjectRelativePathConfig } from "../../step/project/input-project-relative-path-step";
import { SourceDirConfig } from "../../step/project/input-source-dir-step";
import { ProjectLanguageConfig } from "../../step/project/select-project-language-step";
import { PlatformConfig } from "../../step/project/select-project-platform-step";
import { ProjectTypeConfig } from "../../step/project/select-project-type-step";
import { BaseFlowConfig } from "../base-flow-config";

export interface CreateProjectFlowConfig extends 
	BaseFlowConfig, 
	ProjectNameConfig,
	ProjectRelativePathConfig,
	ProjectTypeConfig,
	ProjectLanguageConfig,
	SourceDirConfig,
	IncludeDirConfig,
	PlatformConfig
{
}
