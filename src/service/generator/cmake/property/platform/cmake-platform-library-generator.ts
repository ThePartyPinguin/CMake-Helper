import { Platform } from "../../../../../model/project/platform/platform";
import { CMakeGeneratorHelper } from "../../cmake-generator-helper";
import { CMakeVariable } from "../../cmake-variable";
import { PlatformPropertyGenerator } from "./cmake-platform-property-generator";

export class CMakePlatformLibraryGenerator extends PlatformPropertyGenerator
{
	generate(_value: Platform, _fileContent: string[]): void {
		
		if(!_value.libraries)
		{
			return;
		}

		const directoryListVarName = CMakeGeneratorHelper.formatVarString(this.project.name, CMakeVariable.INCLUDE_DIR_LIST);

		for (const lib of _value.libraries) {
			_fileContent.push(`\t# Include and link ${lib.name}`);

			for (const dir of lib.includeDirectories) 
			{
				_fileContent.push(`\tlist(APPEND "${directoryListVarName}" "${dir}")`);
			}

			_fileContent.push(`\ttarget_link_libraries("${this.project.name}" "${lib.name}")`);	
		}
	}	
}