import { Project } from "../../../../../model/project/project";
import { PropertyGenerator } from "../../../property/property-generator";

export class CMakeGlobalPreCompiledHeaderGenerator extends PropertyGenerator<Project>
{
	generate(_value: Project, _fileContent: string[]): void {
		
		if(!_value.preCompiledHeader)
		{
			return;
		}

		_fileContent.push('# Set pre compiled header')
		_fileContent.push(`target_precompile_headers("${_value.name}" PRIVATE "${_value.preCompiledHeader}")`);
	}	
}