import { ChildProject } from "./child-project";

export interface RootProject
{
	projectName: string;
	binaryDirectory: string;
	childProject: ChildProject[];
}