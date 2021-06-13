import { Project } from "../../../../model/project/project";
import { PropertyGenerator } from "../../property/property-generator";
import { CMakeGeneratorHelper } from "../cmake-generator-helper";
import { CMakeVariable } from "../cmake-variable";

export class CMakeSourceDirectoryVariableGenerator extends PropertyGenerator
{
	generate(_project: Project, _fileContent: string[]): void {
		_fileContent.push(`# Source directory variable`);

		const sourceDirVar = CMakeGeneratorHelper.formatVarString(this._varSafeProjectName, CMakeVariable.PROJECT_SOURCE_DIR);
		_fileContent.push(`set(${sourceDirVar} "${_project.sourceDirectory}" PARENT_SCOPE)`);
	}
}