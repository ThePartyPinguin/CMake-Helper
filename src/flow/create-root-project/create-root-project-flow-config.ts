import { RootProjectNameConfig } from "../../step/root-project/input-root-project-name-step";
import { RootProjectBinaryDir } from "../../step/root-project/input-root-root-project-binary-dir";
import { BaseFlowConfig } from "../base-flow-config";
import { CreateProjectFlowConfig } from "../create-project/create-project-flow-config";

export interface CreateRootProjectFlowConfig extends
	BaseFlowConfig,
	RootProjectNameConfig,
	RootProjectBinaryDir,
	CreateProjectFlowConfig<CreateRootProjectFlowConfig>
{
}