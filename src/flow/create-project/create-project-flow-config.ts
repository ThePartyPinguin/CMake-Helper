import { ProjectNameConfig } from "../../step/project/input-project-name-step";
import { TextInputFlowConfig } from "../../step/text-input-step";

export interface CreateProjectFlowConfig extends TextInputFlowConfig, ProjectNameConfig
{
}
