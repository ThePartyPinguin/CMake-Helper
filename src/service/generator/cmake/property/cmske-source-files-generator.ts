import { Project } from "../../../../model/project/project";
import { PropertyGenerator } from "../../property/property-generator";
import { CMakeGeneratorHelper } from "../cmake-generator-helper";
import { CMakeVariable } from "../cmake-variable";

export class CMakeSourceFilesGenerator extends PropertyGenerator
{
	generate(_project: Project, _fileContent: string[]): void {
		if(!_project.sourceFiles || _project.sourceFiles.length <= 0)
		{
			return;
		}

		const sourceVarName = CMakeGeneratorHelper.formatVarString(this._varSafeProjectName, CMakeVariable.PROJECT_SOURCE_FILES);
		
		_fileContent.push('# Source files');
		_fileContent.push(`Set(${sourceVarName}`);

		for (const sourceFile of _project.sourceFiles) {
			_fileContent.push(`\t"${sourceFile}"`);
		}

		_fileContent.push(')');
	}	
}