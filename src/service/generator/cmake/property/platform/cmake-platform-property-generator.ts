import { Platform } from "../../../../../model/project/platform/platform";
import { Project } from "../../../../../model/project/project";
import { PropertyGenerator } from "../../../property/property-generator";

export abstract class PlatformPropertyGenerator extends PropertyGenerator<Platform>
{
	protected project: Project;

	constructor(_project: Project, _varSafeProjectName: string)
	{
		super(_varSafeProjectName);
		this.project = _project;
	}
}