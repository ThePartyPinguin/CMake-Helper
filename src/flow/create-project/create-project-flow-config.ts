import { ProjectNameConfig } from "../../step/project/input-project-name-step";
import { ProjectLanguageConfig } from "../../step/project/select-project-language-step";
import { ProjectTypeConfig } from "../../step/project/select-project-type-step";
import { BaseFlowConfig } from "../base-flow-config";

export interface CreateProjectFlowConfig extends 
	BaseFlowConfig, 
	ProjectNameConfig,
	ProjectTypeConfig,
	ProjectLanguageConfig
{
}
