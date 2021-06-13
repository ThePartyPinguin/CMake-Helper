import { BaseFlowConfig } from "../../flow/base-flow-config";
import { Project } from "../../model/project/project";
import { SelectionInputStep, SelectionInputStepConfig, SelectionItem } from "../input/selection-input-step";
import { StepNames } from "../step-names";

export interface SelectProjectConfig extends BaseFlowConfig
{
	existingProjects: {[key: string]: Project}
	selectedProject?: Project
}

export class SelectProjectStep<TFlowConfig extends SelectProjectConfig> extends SelectionInputStep<Project, TFlowConfig>
{
	constructor(
		_config: TFlowConfig)
	{
		super(_config, StepNames.selectProject);
	}
	
	validateInput(_selectedItem: SelectionItem<Project>): string | true {
		return true;
	}

	protected onValueSelected(selectedItem: SelectionItem<Project>): void {
		this.config.selectedProject = selectedItem.item;
	}

	public getStepConfig(): SelectionInputStepConfig<Project> {

		const projectNames = Object.keys(this.config.existingProjects);

		return {
			stepTitle: this.config.flowName,
			placeHolder: 'Project',
			ignoreFocusOut: true,
			items: projectNames.map(name => {
				const project = this.config.existingProjects[name];

				return <SelectionItem<Project>>{
					label: `${name} - ${project.version}`,
					description: project.relativePath,
					item: project
				}
			})
		}	
	}
}