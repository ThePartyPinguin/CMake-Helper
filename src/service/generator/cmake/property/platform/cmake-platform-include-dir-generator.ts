import { Platform } from "../../../../../model/project/platform/platform";
import { RegexConstants } from "../../../../../util/regex-constants";
import { CMakeGeneratorHelper } from "../../cmake-generator-helper";
import { CMakeVariable } from "../../cmake-variable";
import { PlatformPropertyGenerator } from "./cmake-platform-property-generator";

export class CMakePlatformIncludeDirGenerator extends PlatformPropertyGenerator
{
	generate(_project: Platform, _fileContent: string[]): void {

		if(!_project.includeDirectories || _project.includeDirectories.length == 0)
		{
			return;
		}

		_fileContent.push('# Global include directories')

		const directoryListVarName = CMakeGeneratorHelper.formatVarString(this.project.name, CMakeVariable.INCLUDE_DIR_LIST);

		const relativeDirectoryRegex = new RegExp(RegexConstants.relativeDirectoryRegex);

		for (const directory of _project.includeDirectories) 
		{
			let finalDirectory = directory;
			if(relativeDirectoryRegex.test(directory))
			{
				finalDirectory = `\${PROJECT_SOURCE_DIR}/${directory}`;
			}
			_fileContent.push(`list(APPEND "${directoryListVarName}" "${finalDirectory}")`);
		}
	}
}