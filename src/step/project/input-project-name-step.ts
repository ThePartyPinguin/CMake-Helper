import { StepService } from "../../service/step-service";
import {  BaseStepConfig } from "../step-base";
import { TextInputStep, TextInputFlowConfig, TextInputStepConfig } from "../text-input-step";

export interface ProjectNameConfig extends TextInputFlowConfig
{
	projectName?: string;
}

export class InputProjectNameStep<TConfig extends ProjectNameConfig> extends TextInputStep<TConfig>
{
	constructor(
		_config: TConfig, 
		_service: StepService<TConfig>)
	{
		super(_config, _service, 'project-name');
	}

	getStepConfig(): BaseStepConfig {
		return <TextInputStepConfig>{
			stepTitle: this.config.flowName,
			placeHolder: 'Enter project name'
		};
	}
}