import { BaseFlowConfig } from "../../flow/base-flow-config";
import { TextInputStep, TextInputStepConfig } from "../input/text-input-step";
import { StepNames } from "../step-names";

export interface SourceDirConfig extends BaseFlowConfig
{
	srcDir: string;
}

export class InputSourceDirStep<TFlowConfig extends SourceDirConfig> extends TextInputStep<TFlowConfig>
{
	private static directoryRegexMatchString : string = '^(?!\/)[\\w-/]+(?<!\/)$';

	private _directoryRegex: RegExp;

	constructor(
		_config: TFlowConfig)
	{
		super(_config, StepNames.inputSourceDir);
		this._directoryRegex = new RegExp(InputSourceDirStep.directoryRegexMatchString, 'gi');
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

		return `Invalid input! Path should be conform regex: '${InputSourceDirStep.directoryRegexMatchString}'`
	}

	protected onInput(inputValue: string): void {

		if(!inputValue || inputValue == '')
		{
			this.config.srcDir = 'src';
			return;
		}

		this.config.srcDir = inputValue;
	}

	public getStepConfig(): TextInputStepConfig {
		return {
			stepTitle: 'Source dir',
			placeHolder: 'Enter directory',
			prompt: 'Set the directory of the project\'s source files. Keep empty to keep default directory (src)',
			ignoreFocusOut: true
		}
	}
	
}