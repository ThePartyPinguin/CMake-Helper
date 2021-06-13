import { Project } from "../../model/project/project";
import { GeneratedFileInfo } from "./generated-file-info";

export interface ProjectFileGenerator
{
	generateFileContents(_project: Project): GeneratedFileInfo;
}