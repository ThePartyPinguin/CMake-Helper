import { Project } from "../../../../model/project/project";
import { PropertyGenerator } from "../../property/property-generator";
import { CMakeGeneratorHelper } from "../cmake-generator-helper";
import { CMakeVariable } from "../cmake-variable";

export class CMakeSourceFileVariableGenerator extends PropertyGenerator
{
	generate(_project: Project, _fileContent: string[]): void {
		
		if(!_project.sourceFiles || _project.sourceFiles.length == 0)
		{
			return;
		}

		const sourceVarName = CMakeGeneratorHelper.formatVarString(this._varSafeProjectName, CMakeVariable.PROJECT_SOURCE_FILES);
		let line = `set(${sourceVarName}`;

		for (const filePath of _project.sourceFiles) {
			line += `\t${filePath}\r\n`;
		}

		line += ')';
	}	
}