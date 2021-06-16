import { Project } from "../../../../model/project/project";
import { Visibility } from "../../../../model/project/visibility";
import { PropertyGenerator } from "../../property/property-generator";
import { CMakeGeneratorHelper } from "../cmake-generator-helper";
import { CMakeVariable } from "../cmake-variable";

export class CMakeTargetIncludeDirGenerator extends PropertyGenerator<Project>
{
	generate(_project: Project, _fileContent: string[]): void {
		
		var visibilities = <Visibility[]>Object.keys(Visibility);

		_fileContent.push('# Set target include directories')
		for (const visibility of visibilities) {
			const directoryListVarName = CMakeGeneratorHelper.formatVisibilityVarString(_project.name, visibility, CMakeVariable.LIBRARY_INCLUDE_DIR_LIST);
			
			const cmakeVisibility = CMakeGeneratorHelper.visibilityToCMakeVisibility(visibility);

			_fileContent.push(`target_include_directories("${_project.name}" ${cmakeVisibility} \${${directoryListVarName}})`);
		}
	}	
}