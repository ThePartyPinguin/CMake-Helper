import { Project } from "../../../../../model/project/project";
import { PropertyGenerator } from "../../../property/property-generator";
import { CMakeGeneratorHelper } from "../../cmake-generator-helper";
import { CMakeVariable } from "../../cmake-variable";

export class CMakeGlobalLibraryGenerator extends PropertyGenerator<Project>
{
	generate(_value: Project, _fileContent: string[]): void {
		
		if(!_value.libraries)
		{
			return;
		}

		const directoryListVarName = CMakeGeneratorHelper.formatVarString(_value.name, CMakeVariable.INCLUDE_DIR_LIST);

		for (const lib of _value.libraries) {
			_fileContent.push(`# Include and link ${lib.name}`);

			for (const dir of lib.includeDirectories) 
			{
				_fileContent.push(`list(APPEND "${directoryListVarName}" "${dir}")`);
			}

			_fileContent.push(`target_link_libraries("${_value.name}" "${lib.name}")`);	
		}
	}	
}