import { BaseFlowConfig } from "../../flow/base-flow-config";
import { ProjectType } from "../../model/project/project-type";
import { BaseStep, BaseStepConfig } from "../base-step";
import { SelectionInputStep, SelectionInputStepConfig, SelectionItem } from "../input/selection-input-step";

export interface ProjectTypeConfig extends BaseFlowConfig
{
	type: ProjectType;
}

export class SelectProjectTypeStep<TFlowConfig extends ProjectTypeConfig> extends SelectionInputStep<ProjectType, TFlowConfig>
{
	validateInput(selectedItem: SelectionItem<ProjectType>): string | true {
		const isProjectType = Object.keys(ProjectType).includes(selectedItem.item);

		if(isProjectType)
		{
			return true;
		}

		return 'Invalid project type selected!';
	}
	protected onValueSelected(selectedItem: SelectionItem<ProjectType>): void {
		this.config.type = selectedItem.item;
	}
	public getStepConfig(): BaseStepConfig {
		const types = ProjectType;
		return <SelectionInputStepConfig<ProjectType>>{
			stepTitle: 'Project type',
			placeHolder: 'Select project type',
			ignoreFocusOut: true,
			items: Object.values(types).map(k => this.convertProjectTypeToSelectionItem(k))
		}
	}	
	
	private convertProjectTypeToSelectionItem(type: ProjectType): SelectionItem<ProjectType>
	{
		switch(type)
		{
			case ProjectType.EXECUTABLE:
			{	
				return {
					label: 'Executable',
					description: 'Create an executable project',
					item: type
				}
			}
			case ProjectType.STATIC_LIB:
			{	
				return {
					label: 'Static libary',
					description: 'Create an static libary (.lib) project',
					item: type
				}
			}
			case ProjectType.SHARED_LIB:
			{	
				return {
					label: 'Shared library',
					description: 'Create an shared library (.dll) project',
					item: type
				}
			}
		}
	}
}