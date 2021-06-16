import { ProjectType } from "../model/project/project-type";
import { ProjectService } from "../service/project-service";
import { CreateProjectFlowConfig } from "./create-project/create-project-flow-config";
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

	static getDefaultCreateProjectFlowConfig(): CreateProjectFlowConfig
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