import * as vscode from 'vscode';
import { Project } from "../../../model/project/project";
import { GeneratedFileInfo } from "../generated-file-info";
import { ProjectFileGenerator } from "../project-generator";
import { PropertyGenerator } from "../property/property-generator";
import { CMakeGeneratorHelper } from './cmake-generator-helper';
import { CMakeFileHeaderGenerator } from "./property/cmake-file-header-generator";
import { CMakeGlobalLibraryGenerator } from './property/cmake-global-library-generator';
import { CMakeIncludeDirectoryVariableGenerator } from './property/cmake-include-dir-variable-generator';
import { CMakeProjectDeclGenerator } from './property/cmake-project-decl-generator';
import { CMakeProjectLanguageGenerator } from './property/cmake-project-language-generator';
import { CMakeSourceDirectoryVariableGenerator } from './property/cmake-source-dir-variable-generator';
import { CMakeSourceFileVariableGenerator } from './property/cmake-source-file-variable-generator';
import { CMakeTargetGenerator } from './property/cmake-target-generator';

export class CMakeFileGenerator implements ProjectFileGenerator
{
	static minimalCMakeVersion: string = '3.16.0';

	private static propertyGenerators: (new(_varSafeFileName: string) => PropertyGenerator)[] = [
		CMakeFileHeaderGenerator,
		CMakeProjectDeclGenerator,
		CMakeProjectLanguageGenerator,
		CMakeIncludeDirectoryVariableGenerator,
		CMakeSourceDirectoryVariableGenerator,
		CMakeSourceFileVariableGenerator,
		CMakeTargetGenerator,
		CMakeGlobalLibraryGenerator
	]

	generateFileContents(_project: Project): GeneratedFileInfo {
		const cmakeFileContents: string[] = [];

		const varSafeProjectName: string = CMakeGeneratorHelper.formatVarSafeString(_project.name);

		for (const generator of CMakeFileGenerator.propertyGenerators) {
			const instance = new generator(varSafeProjectName);
			instance.generate(_project, cmakeFileContents);
		}

		return {
			fileName: 'CMakeLists.txt',
			relativeUri: vscode.Uri.parse(_project.relativePath),
			fileLines: cmakeFileContents
		}
	}
}