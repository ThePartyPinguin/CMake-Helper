import { Project } from "../../../model/project/project";
import { PropertyGenerator } from "../property/property-generator";
import { CMakeFileGenerator } from './cmake-file-generator';
import { CMakeFileHeaderGenerator } from "./property/global/cmake-file-header-generator";
import { CMakeGlobalLibraryGenerator } from './property/global/cmake-global-library-generator';
import { CMakeGlobalPackageGenerator } from "./property/global/cmake-global-package-generator";
import { CMakeGlobalProjectLinkGenerator } from "./property/global/cmake-global-project-link-generator";
import { CMakePlatformTargetGenerator } from "./property/global/cmake-platform-target-generator";
import { CMakeProjectDeclGenerator } from "./property/global/cmake-project-decl-generator";
import { CMakeProjectIncludeDirGenerator } from "./property/global/cmake-project-include-dir-generator";
import { CMakeProjectLanguageGenerator } from "./property/global/cmake-project-language-generator";
import { CMakeSourceFilesGenerator } from "./property/global/cmake-source-files-generator";
import { CMakeTargetIncludeDirGenerator } from "./property/global/cmake-target-include-dir-generator";
import { CMakePlatformGenerator } from "./property/platform/cmake-platform-generator";

export class ProjectCMakeFileGenerator extends CMakeFileGenerator<Project>
{
	private static propertyGenerators: (new(_varSafeFileName: string) => PropertyGenerator<Project>)[] = [
		CMakeFileHeaderGenerator,
		CMakeProjectDeclGenerator,
		CMakeProjectLanguageGenerator,
		CMakeSourceFilesGenerator,
		CMakePlatformTargetGenerator,
		CMakeProjectIncludeDirGenerator,
		CMakeGlobalProjectLinkGenerator,
		CMakeGlobalPackageGenerator,
		CMakeGlobalLibraryGenerator,
		CMakePlatformGenerator,
		CMakeTargetIncludeDirGenerator
	]

	protected getGenerators(): (new (_varSafeUid: string) => PropertyGenerator<Project>)[] {
		return ProjectCMakeFileGenerator.propertyGenerators;
	}
}