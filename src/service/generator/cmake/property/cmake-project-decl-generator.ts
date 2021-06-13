import { Project } from "../../../../model/project/project";
import { PropertyGenerator } from "../../property/property-generator";
import { CMakeFileGenerator } from "../cmake-file-generator";
import { CMakeGeneratorHelper } from "../cmake-generator-helper";
import { CMakeVariable } from "../cmake-variable";

export class CMakeProjectDeclGenerator extends PropertyGenerator
{
	generate(_project: Project, _fileContent: string[]): void {
		// Set cmake version
		_fileContent.push(`cmake_minimum_required(VERSION ${CMakeFileGenerator.minimalCMakeVersion})`);

		// Create project decleration that include name, version and languages
		_fileContent.push(`# Project`);

		let projectLine = _project.name;
		projectLine += ` VERSION ${_project.version}`;

		const languages = Object.keys(_project.language);
		projectLine += `LANGUAGES`;
		for (const language of languages) {
			projectLine += ` ${language}`;
		}
		_fileContent.push(`project(${projectLine})`);

		// Create a project version variable
		_fileContent.push(`# Project version variable`);
		
		const versionVar = CMakeGeneratorHelper.formatVarString(this._varSafeProjectName, CMakeVariable.PROJECT_VERSION);
		_fileContent.push(`set(${versionVar} "\${${_project.name}_VERSION}" PARENT_SCOPE)`);
	}
}