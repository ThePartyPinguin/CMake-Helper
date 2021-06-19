import { Platform } from "../../../../../model/project/platform/platform";
import { CMakeGeneratorHelper } from "../../cmake-generator-helper";
import { CMakeVariable } from "../../cmake-variable";
import { PlatformPropertyGenerator } from "./cmake-platform-property-generator";

export class CMakePlatformPackageGenerator extends PlatformPropertyGenerator
{
	generate(_value: Platform, _fileContent: string[]): void {

		if(!_value.packages)
		{
			return;
		}
		
		const directoryListVarName = CMakeGeneratorHelper.formatVarString(this.project.name, CMakeVariable.INCLUDE_DIR_LIST);

		for (const p of _value.packages) {
			_fileContent.push(`\t# Find and require ${p.name}`);
			_fileContent.push(`\tfind_package(${p.name} REQUIRED)`);

			for (const dir of p.includeDirectories) 
			{
				_fileContent.push(`\tlist(APPEND "${directoryListVarName}" "${dir}")`);
			}

			for (const lib of p.libraries) {
				_fileContent.push(`\ttarget_link_libraries("${this.project.name}" "${lib}")`);				
			}
		}
	}
}