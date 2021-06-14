import * as vscode from 'vscode';
import { Project } from "../../../model/project/project";
import { GeneratedFileInfo } from "../generated-file-info";
import { ProjectFileGenerator } from "../project-generator";
import { PropertyGenerator } from "../property/property-generator";
import { CMakeGeneratorHelper } from './cmake-generator-helper';
import { CMakeFileHeaderGenerator } from "./property/cmake-file-header-generator";
import { CMakeGlobalLibraryGenerator } from './property/cmake-global-library-generator';
import { CMakePlatformLibraryGenerator } from './property/cmake-platform-library-generator';
import { CMakePlatformTargetGenerator } from './property/cmake-platform-target-generator';
import { CMakeProjectDeclGenerator } from './property/cmake-project-decl-generator';
import { CMakeProjectIncludeDirGenerator } from './property/cmake-project-include-dir-generator';
import { CMakeProjectLanguageGenerator } from './property/cmake-project-language-generator';
import { CMakeTargetIncludeDirGenerator } from './property/cmake-target-include-dir-generator';
import { CMakeSourceFilesGenerator } from './property/cmske-source-files-generator';

export class CMakeFileGenerator implements ProjectFileGenerator
{
	static minimalCMakeVersion: string = '3.16.0';

	private static propertyGenerators: (new(_varSafeFileName: string) => PropertyGenerator)[] = [
		CMakeFileHeaderGenerator,
		CMakeProjectDeclGenerator,
		CMakeProjectLanguageGenerator,
		CMakeSourceFilesGenerator,
		CMakePlatformTargetGenerator,
		CMakeProjectIncludeDirGenerator,
		CMakeGlobalLibraryGenerator,
		CMakePlatformLibraryGenerator,
		CMakeTargetIncludeDirGenerator
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