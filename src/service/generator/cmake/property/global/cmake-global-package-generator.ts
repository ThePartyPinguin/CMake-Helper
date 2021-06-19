import { Project } from "../../../../../model/project/project";
import { PropertyGenerator } from "../../../property/property-generator";
import { CMakeGeneratorHelper } from "../../cmake-generator-helper";
import { CMakeVariable } from "../../cmake-variable";

export class CMakeGlobalPackageGenerator extends PropertyGenerator<Project>
{
	generate(_value: Project, _fileContent: string[]): void {

		if(!_value.packages)
		{
			return;
		}
		
		const directoryListVarName = CMakeGeneratorHelper.formatVarString(_value.name, CMakeVariable.INCLUDE_DIR_LIST);

		for (const p of _value.packages) {
			_fileContent.push(`# Find and require ${p.name}`);
			_fileContent.push(`find_package(${p.name} REQUIRED)`);

			for (const dir of p.includeDirectories) 
			{
				_fileContent.push(`list(APPEND "${directoryListVarName}" "${dir}")`);
			}

			for (const lib of p.libraries) {
				_fileContent.push(`target_link_libraries("${_value.name}" "${lib}")`);				
			}
		}
	}
}