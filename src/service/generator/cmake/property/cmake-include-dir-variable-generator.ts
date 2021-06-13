import { Project } from "../../../../model/project/project";
import { PropertyGenerator } from "../../property/property-generator";
import { CMakeGeneratorHelper } from "../cmake-generator-helper";
import { CMakeVariable } from "../cmake-variable";

export class CMakeIncludeDirectoryVariableGenerator extends PropertyGenerator
{
	generate(_project: Project, _fileContent: string[]): void {
		_fileContent.push(`# Include directory variable`);

		const includeDirVar = CMakeGeneratorHelper.formatVarString(this._varSafeProjectName, CMakeVariable.PROJECT_INCLUDE_DIR);
		_fileContent.push(`set(${includeDirVar} "${_project.includeDirectory}" PARENT_SCOPE)`);
	}	
}