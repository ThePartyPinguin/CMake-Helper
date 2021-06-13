import { BaseFlowConfig } from "../../flow/base-flow-config";
import { TextInputStep, TextInputStepConfig } from "../input/text-input-step";
import { StepNames } from "../step-names";

export interface ProjectRelativePathConfig extends BaseFlowConfig
{
	relativePath: string;
}

export class InputProjectRelativePathStep<TFlowConfig extends ProjectRelativePathConfig> extends TextInputStep<TFlowConfig>
{
	private static directoryRegexMatchString : string = '^(?!\/)[\\w/-_\.]+(?<!\/)$';

	private _directoryRegex: RegExp;

	constructor(
		_config: TFlowConfig)
	{
		super(_config, StepNames.inputProjectRelativePath);
		this._directoryRegex = new RegExp(InputProjectRelativePathStep.directoryRegexMatchString, 'gi');
	}

	validateInput(inputValue: string): string | true {
		if(!inputValue || inputValue == '')
		{
			return true;
		}

		const valid = this._directoryRegex.test(inputValue);

		if(valid)
		{
			return true;
		}

		return `Invalid input! Path should be conform regex: '${InputProjectRelativePathStep.directoryRegexMatchString}'`
	}
	protected onInput(inputValue: string): void {
		if(!inputValue || inputValue == '')
		{
			this.config.relativePath = '';
			return;
		}

		this.config.relativePath = inputValue;
	}
	public getStepConfig(): TextInputStepConfig {
		return {
			stepTitle: 'Enter relative path',
			prompt: 'Enter the relative path where the project should be saved. Empty for workspace root',
			placeHolder: 'Path (empty for workspace root)',
			ignoreFocusOut: true
		}
	}
}