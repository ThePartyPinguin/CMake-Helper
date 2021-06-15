import * as vscode from 'vscode';
import { BaseFlow } from '../flow/base-flow';
import { BaseFlowConfig } from '../flow/base-flow-config';
import { FlowRunner } from '../flow/flow-runner';

export class FlowService
{
	private _context: vscode.ExtensionContext;

	constructor(
		_context: vscode.ExtensionContext)
	{
		this._context = _context;
	}

	registerFlow<
		TFlowConfig extends BaseFlowConfig,
		TFlow extends BaseFlow<TFlowConfig>>(
			_command: string,
			_configCreateCallback: () => TFlowConfig | Promise<TFlowConfig>, 
			_flowType: (new (_config: TFlowConfig) => TFlow))
	{
		const command = vscode.commands.registerCommand(_command, () => {

			let configCallbackResult = _configCreateCallback();

			if('then' in configCallbackResult)
			{
				configCallbackResult.then((config: TFlowConfig) => {
					FlowRunner.executeFlow(config, _flowType)
				});
			}
			else
			{
				FlowRunner.executeFlow(configCallbackResult, _flowType)
			}
		});

		this._context.subscriptions.push(command);
	}
}