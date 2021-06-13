import { BaseFlowConfig } from "../../flow/base-flow-config";
import { TextInputStep, TextInputStepConfig } from "../input/text-input-step";
import { StepNames } from "../step-names";

export interface IncludeDirConfig extends BaseFlowConfig
{
	includeDir: string;
}

export class InputIncludeDirStep<TFlowConfig extends IncludeDirConfig> extends TextInputStep<TFlowConfig>
{
	private static directoryRegexMatchString : string = '^(?!\/)[\\w-/]+(?<!\/)$';

	private _directoryRegex: RegExp;

	constructor(
		_config: TFlowConfig)
	{
		super(_config, StepNames.inputIncludeDir);
		this._directoryRegex = new RegExp(InputIncludeDirStep.directoryRegexMatchString, 'gi');
	}
	
	validateInput(inputValue: string): string | true {
		if(!inputValue || inputValue == '')
		{
			return true;
		}

		const isValid = this._directoryRegex.test(inputValue);

		if(isValid)
		{
			return true;
		}

		return `Invalid input! Path should be conform regex: '${InputIncludeDirStep.directoryRegexMatchString}'`;
	}
	protected onInput(inputValue: string): void {
		if(!inputValue || inputValue == '')
		{
			this.config.includeDir = 'include';
			return;
		}

		this.config.includeDir = inputValue;
	}
	public getStepConfig(): TextInputStepConfig {
		return {
			stepTitle: 'Include directory',
			placeHolder: 'Enter directory',
			prompt: 'Set the directory of the project\'s source files. Keep empty to keep default directory (include)',
			ignoreFocusOut: true
		}
	}	
}