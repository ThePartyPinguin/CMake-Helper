import { BaseFlowConfig } from "../../flow/base-flow-config";
// import { Project } from "../../model/project/project";
import { BaseStepConfig } from "../base-step";
import { SelectionInputStep, SelectionInputStepConfig, SelectionItem } from "../input/selection-input-step";

export class SelectProjectStep<TFlowConfig extends BaseFlowConfig> extends SelectionInputStep<{name: string, value: boolean}, TFlowConfig>
{
	validateInput(_selectedItem: SelectionItem<{name: string, value: boolean}>): string | true {
		return true;
	}

	protected onValueSelected(selectedItem: SelectionItem<{name: string, value: boolean}>): void {
		console.log('Item selected!');
		console.log(selectedItem);
	}

	public getStepConfig(): BaseStepConfig {
		return <SelectionInputStepConfig<{name: string, value: boolean}>>{
			stepTitle: this.config.flowName,
			placeHolder: 'Project',
			items: [
				{
					label: 'test - label',
					description: 'test - description',
					detail: 'test - detail',
					item: {
						name: 'test',
						value: true
					}
				},
				{
					label: 'test 2 - label',
					description: 'test 2 - description',
					detail: 'test 2 - detail',
					item: {
						name: 'test 2',
						value: true
					}
				},
				{
					label: 'test 3 - label',
					description: 'test 3 - description',
					detail: 'test 3 - detail',
					item: {
						name: 'test 3',
						value: true
					}
				}
			]
		}
	}
}