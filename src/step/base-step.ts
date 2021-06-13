import { BaseFlowConfig } from "../flow/base-flow-config";
import { StepBluePrint } from "./step-blueprint";
import { StepDisplayType } from "./step-display-type";

export interface BaseStepConfig
{
	stepTitle: string,
	placeHolder: string,
	ignoreFocusOut: boolean
}

export abstract class BaseStep<TFlowConfig extends BaseFlowConfig, TStepConfig extends BaseStepConfig>
{
	config: TFlowConfig

	private _stepName: string;

	public get stepName(): string{
		return this._stepName;
	}

	private _displayType: StepDisplayType;

	public get displayType(): StepDisplayType {
		return this._displayType;
	}

	getNextStep?: (_config: TFlowConfig) => StepBluePrint<TFlowConfig> | undefined;
	onCanceled?: (_config: TFlowConfig) => void;

	constructor(
		_displayType: StepDisplayType,
		_config: TFlowConfig,
		_stepName: string)
	{
		this._displayType = _displayType;
		this.config = _config;
		this._stepName = _stepName;
	}

	public abstract getStepConfig() : TStepConfig;
}