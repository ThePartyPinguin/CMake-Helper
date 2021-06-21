import { SelectProjectConfig } from "../../step/project/select-project-step";
import { BaseFlowConfig } from "../base-flow-config";

export interface AddFileToProjectFlowConfig extends 
	BaseFlowConfig,
	SelectProjectConfig
{
}