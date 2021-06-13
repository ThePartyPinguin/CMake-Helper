import { Project } from "../../../model/project/project";

export abstract class PropertyGenerator
{
	protected _varSafeProjectName: string;
	
	constructor(
		_varSafeProjectName: string)
	{
		this._varSafeProjectName = _varSafeProjectName;
	}

	abstract generate(_project: Project, _fileContent: string[]): void;
}