import { BaseFlowConfig } from "../../flow/base-flow-config";
import { ProjectLanguage } from "../../model/project/project-language";
import { ProjectType } from "../../model/project/project-type";
import { BaseStepConfig } from "../base-step";
import { MultiSelectionInputStep } from "../input/multi-selection-input-step";
import { SelectionInputStepConfig, SelectionItem } from "../input/selection-input-step";

export interface ProjectLanguageConfig extends BaseFlowConfig
{
	languages: ProjectLanguage[];
}

export class SelectProjectLanguageStep<TFlowConfig extends ProjectLanguageConfig> extends MultiSelectionInputStep<ProjectLanguage, TFlowConfig>
{
	validateInput(selectedItems: SelectionItem<ProjectLanguage>[]): string | true {
		
		if(!selectedItems || selectedItems.length == 0)
		{
			return 'Please select one or more languages';
		}

		for (const selectedItem of selectedItems) {
			const valueExists = Object.keys(ProjectLanguage).includes(selectedItem.item);

			if(!valueExists)
			{
				return 'Invalid project language selected';
			}
		}

		return true;
	}
	protected onValueSelected(selectedItems: SelectionItem<ProjectLanguage>[]): void 
	{
		this.config.languages = selectedItems.map(i => i.item);
	}
	
	public getStepConfig(): BaseStepConfig {

		const language = ProjectLanguage;
		return <SelectionInputStepConfig<ProjectLanguage>>{
			stepTitle: 'Project language',
			placeHolder: 'Select project language',
			ignoreFocusOut: true,
			items: Object.values(language).map(k => this.convertProjectLanguageToSelectionItem(k))
		}
	}	
	
	private convertProjectLanguageToSelectionItem(type: ProjectLanguage): SelectionItem<ProjectLanguage>
	{
		switch(type)
		{
			case ProjectLanguage.C:
			{	
				return {
					label: 'C',
					description: 'The project supports the C (v17) programming language',
					item: type
				}
			}
			case ProjectLanguage.CXX:
			{	
				return {
					label: 'CXX (c++)',
					description: 'The project supports the C++ (v17) programming language',
					item: type
				}
			}
		}
	}
}