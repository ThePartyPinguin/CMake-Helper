import { BaseFlowConfig } from "../../flow/base-flow-config";
import { SelectionInputStep, SelectionInputStepConfig, SelectionItem } from "../input/selection-input-step";
import { StepNames } from "../step-names";

export interface InitConfig extends BaseFlowConfig
{
	isRootProject?: boolean;
}

export class InitStep<TFlowConfig extends InitConfig> extends SelectionInputStep<boolean, TFlowConfig>
{
	constructor(
		_config: TFlowConfig)
	{
		super(_config, StepNames.initStep);
	}

	validateInput(selectedItem: SelectionItem<boolean>): string | true {
		if(typeof selectedItem.item === 'boolean')
		{
			return true;
		}

		return 'Selected item must be a boolean';
	}

	protected onValueSelected(selectedItem: SelectionItem<boolean>): void {
		this.config.isRootProject = selectedItem.item;
	}

	public getStepConfig(): SelectionInputStepConfig<boolean> {
		return <SelectionInputStepConfig<boolean>>{
			stepTitle: 'Create a root project?',
			placeHolder: 'Yes/No',
			items: [
				{
					label: 'Yes',
					description: 'Use this is you plan on using multiple projects',
					detail: 'This will create a CMakeLists.txt that will include all other project into a single project',
					item: true
				},
				{
					label: 'No',
					description: 'Only use this if you don\'t plan on creating multiple projects',
					detail: 'This wil create a single project in the root directory',
					item: false
				}
			],
			ignoreFocusOut: true
		}
	}
	
}