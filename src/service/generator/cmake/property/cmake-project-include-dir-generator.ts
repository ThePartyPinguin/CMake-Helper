import { Project } from "../../../../model/project/project";
import { Visibility } from "../../../../model/project/visibility";
import { PropertyGenerator } from "../../property/property-generator";
import { CMakeGeneratorHelper } from "../cmake-generator-helper";
import { CMakeVariable } from "../cmake-variable";

export class CMakeProjectIncludeDirGenerator extends PropertyGenerator<Project>
{
	generate(_project: Project, _fileContent: string[]): void {
		const definedVisibilities = <Visibility[]>Object.keys(_project.includeDirectories);

		_fileContent.push('# Global include directories')
		for (const visibility of definedVisibilities) {
			const directories = _project.includeDirectories[visibility];

			const directoryListVarName = CMakeGeneratorHelper.formatVisibilityVarString(_project.name, visibility, CMakeVariable.LIBRARY_INCLUDE_DIR_LIST);

			for (const directory of directories) {
				_fileContent.push(`list(APPEND "${directoryListVarName}" "${directory}")`);
			}
		}
	}	
}