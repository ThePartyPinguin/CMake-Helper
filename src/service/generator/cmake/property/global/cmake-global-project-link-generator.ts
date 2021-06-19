import { Project } from "../../../../../model/project/project";
import { PropertyGenerator } from "../../../property/property-generator";

export class CMakeGlobalProjectLinkGenerator extends PropertyGenerator<Project>
{
	generate(_value: Project, _fileContent: string[]): void {

		if(!_value.projectLinks)
		{
			return;
		}

		for (const pl of _value.projectLinks) {
			_fileContent.push(`# Link project ${pl}`);
			_fileContent.push(`target_link_libraries("${_value.name}" "${pl}")`);	
		}
	}
}