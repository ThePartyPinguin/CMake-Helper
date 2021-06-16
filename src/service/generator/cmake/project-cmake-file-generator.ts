import { Project } from "../../../model/project/project";
import { PropertyGenerator } from "../property/property-generator";
import { CMakeFileGenerator } from './cmake-file-generator';
import { CMakeFileHeaderGenerator } from "./property/cmake-file-header-generator";
import { CMakeGlobalLibraryGenerator } from './property/cmake-global-library-generator';
import { CMakePlatformLibraryGenerator } from './property/cmake-platform-library-generator';
import { CMakePlatformTargetGenerator } from './property/cmake-platform-target-generator';
import { CMakeProjectDeclGenerator } from './property/cmake-project-decl-generator';
import { CMakeProjectIncludeDirGenerator } from './property/cmake-project-include-dir-generator';
import { CMakeProjectLanguageGenerator } from './property/cmake-project-language-generator';
import { CMakeTargetIncludeDirGenerator } from './property/cmake-target-include-dir-generator';
import { CMakeSourceFilesGenerator } from './property/cmske-source-files-generator';

export class ProjectCMakeFileGenerator extends CMakeFileGenerator<Project>
{
	private static propertyGenerators: (new(_varSafeFileName: string) => PropertyGenerator<Project>)[] = [
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

	protected getGenerators(): (new (_varSafeUid: string) => PropertyGenerator<Project>)[] {
		return ProjectCMakeFileGenerator.propertyGenerators;
	}
}