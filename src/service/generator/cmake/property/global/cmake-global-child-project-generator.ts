import { Project } from "../../../../../model/project/project";
import { PropertyGenerator } from "../../../property/property-generator";

export class CMakeGlobalChildProjectGenerator extends PropertyGenerator<Project>
{
	generate(_value: Project, _fileContent: string[]): void {
		
		if(!_value.childProjects)
		{
			return;
		}

		_fileContent.push('# Add child projects')
		for (const childProject of _value.childProjects) 
		{
			_fileContent.push(`add_subdirectory("${childProject}")`);
		}
	}	
}