import { ProjectType } from "../model/project/project-type";
import { ProjectService } from "../service/project-service";
import { CreateRootProjectFlowConfig } from "./create-root-project/create-root-project-flow-config";
import { CreateSingleProjectFlowConfig } from "./create-single-project/single-create-project-flow";
import { GenerateProjectFlowConfig } from "./generate-project/generate-project-flow-config";
import { InitFlowConfig } from "./init/init-helper-flow-config";

export class FlowConfigTemplate
{
	static getDefaultInitFlowConfig(): InitFlowConfig
	{
		return {
			flowName: 'Init'
		}
	}

	static getDefaultCreateProjectFlowConfig(): CreateSingleProjectFlowConfig
	{
		return {
			flowName:  'Create project',
			projectName: '',
			relativePath: '',
			type: ProjectType.EXECUTABLE,
			languages: [],
			srcDir: '',
			includeDir: '',
			platforms: []
		};
	}

	static getDefaultCreateRootProjectFlowConfig(): CreateRootProjectFlowConfig
	{
		return {
			flowName:  'Create project',
			rootProjectName: '',
			rootBinaryDirectory: '',
			projectName: '',
			relativePath: '',
			type: ProjectType.EXECUTABLE,
			languages: [],
			srcDir: '',
			includeDir: '',
			platforms: []
		};
	}

	static getDefaultGenerateProjectFlowConfig(): Promise<GenerateProjectFlowConfig>
	{
		return new Promise<GenerateProjectFlowConfig>((resolve) => {
			const projectService = new ProjectService();

			projectService.loadProjects().then(projects => {

				const generateProjectConfig: GenerateProjectFlowConfig = {
					flowName: 'Generate project',
					existingProjects: projects
				};

				resolve(generateProjectConfig);
			});
		})
	}
}