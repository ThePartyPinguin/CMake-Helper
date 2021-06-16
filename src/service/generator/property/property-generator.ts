export abstract class PropertyGenerator<TValue>
{
	protected _varSafeUid: string;
	
	constructor(_varSafeProjectName: string)
	{
		this._varSafeUid = _varSafeProjectName;
	}

	abstract generate(_value: TValue, _fileContent: string[]): void;
}