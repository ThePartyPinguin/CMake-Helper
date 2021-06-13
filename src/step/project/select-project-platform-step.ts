import { BaseFlowConfig } from "../../flow/base-flow-config";
import { PlatformType } from "../../model/project/platform/platform";
import { MultiSelectionInputStep } from "../input/multi-selection-input-step";
import { SelectionInputStepConfig, SelectionItem } from "../input/selection-input-step";
import { StepNames } from "../step-names";

export interface PlatformConfig extends BaseFlowConfig
{
	platforms: PlatformType[];
}

export class SelectPlatformStep<TFlowConfig extends PlatformConfig> extends MultiSelectionInputStep<PlatformType, TFlowConfig>
{
	constructor(
		_config: TFlowConfig)
	{
		super(_config, StepNames.selectProjectLanguage);
	}
	
	validateInput(selectedItems: SelectionItem<PlatformType>[]): string | true {
		
		const platforms = selectedItems.map(s => s.item);

		for (const p of platforms) {
			if(p == PlatformType.UNIVERSAL)
			{
				return 'The platform UNIVERSAL cannot be supported!';
			}
		}

		return true;
	}

	protected onValueSelected(selectedItems: SelectionItem<PlatformType>[]): void {
		const platforms = selectedItems.map(s => s.item);
		this.config.platforms = platforms;
	}

	public getStepConfig(): SelectionInputStepConfig<PlatformType> {
		return {
			stepTitle: 'Select supported platforms',
			placeHolder: 'Platform',
			ignoreFocusOut: true,
			items: Object.values(PlatformType).filter(p => p !== PlatformType.UNIVERSAL).map(p => this.convertPlatformTypeToSelectionItem(p))
		}
	}
	
	private convertPlatformTypeToSelectionItem(type: PlatformType): SelectionItem<PlatformType>
	{
		switch(type)
		{
			case PlatformType.WIN32:
			{	
				return {
					label: 'Windows (WIN32)',
					description: 'Add a Windows target to the project',
					detail: 'Set \'useTargetSubSystem\' to true to enable WIN32 subsystem (required for a gui application)',
					item: type
				}
			}
			case PlatformType.UNIX:
			{	
				return {
					label: 'Linux (UNIX)',
					description: 'Add a Linux target to the project',
					item: type
				}
			}
			case PlatformType.APPLE:
			{	
				return {
					label: 'MacOS (APPLE)',
					description: 'Add a MacOS target to the project',
					detail: 'Set \'useTargetSubSystem\' to true to enable MACOSX_BUNDLE (required for a gui application)',
					item: type
				}
			}
			default:
				return {
					label: 'NOT SUPPORTED',
					description: 'THIS SHOULD NOT BE SHOWED',
					item: PlatformType.UNIVERSAL
				}
		}
	}
}