import { Project } from "../../../../../model/project/project";
import { PropertyGenerator } from "../../../property/property-generator";
import { CMakeGeneratorHelper } from "../../cmake-generator-helper";
import { CMakeVariable } from "../../cmake-variable";

export class CMakeTargetIncludeDirGenerator extends PropertyGenerator<Project>
{
	generate(_project: Project, _fileContent: string[]): void {
		
		const directoryListVarName = CMakeGeneratorHelper.formatVarString(_project.name, CMakeVariable.LIBRARY_INCLUDE_DIR_LIST);

		_fileContent.push('# Set target include directories');
		_fileContent.push(`target_include_directories("${_project.name}" PUBLIC \${${directoryListVarName}})`);
	}	
}