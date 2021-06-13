import { Project } from "../../../../model/project/project";
import { ProjectType } from "../../../../model/project/project-type";
import { PropertyGenerator } from "../../property/property-generator";
import { CMakeGeneratorHelper } from "../cmake-generator-helper";
import { CMakeVariable } from "../cmake-variable";

export class CMakeTargetGenerator extends PropertyGenerator
{
	generate(_project: Project, _fileContent: string[]): void {

		let targetLinePrefix: string = '';
		let targetTypeAddition: string = '';
		switch(_project.type)
		{
			case ProjectType.EXECUTABLE:
			{
				targetLinePrefix = 'add_executable';
				break;
			}
			case ProjectType.STATIC_LIB:
			{
				targetLinePrefix = 'add_library';
				targetTypeAddition = 'STATIC ';
				break;
			}
			case ProjectType.SHARED_LIB:
			{
				targetLinePrefix = 'add_library';
				targetTypeAddition = 'SHARED ';
				break;
			}
		}

		const sourceVarName = CMakeGeneratorHelper.formatVarString(this._varSafeProjectName, CMakeVariable.PROJECT_SOURCE_FILES);
		_fileContent.push(`${targetLinePrefix}("${_project.name}" ${targetTypeAddition}\${${sourceVarName}})`);
	}
}