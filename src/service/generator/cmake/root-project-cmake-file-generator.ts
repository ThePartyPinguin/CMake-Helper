import { RootProject } from "../../../model/root-project/root-project";
import { PropertyGenerator } from "../property/property-generator";
import { CMakeFileGenerator } from "./cmake-file-generator";

export class RootProjectCMakeFileGenerator extends CMakeFileGenerator<RootProject>
{
	protected getGenerators(): (new (_varSafeUid: string) => PropertyGenerator<RootProject>)[] {
		throw new Error("Method not implemented.");
	}
	// private static propertyGenerators: (new(_varSafeFileName: string) => PropertyGenerator<Project>)[] = [
	// 	CMakeFileHeaderGenerator,
	// 	CMakeProjectDeclGenerator,
	// 	CMakeProjectLanguageGenerator,
	// 	CMakeSourceFilesGenerator,
	// 	CMakePlatformTargetGenerator,
	// 	CMakeProjectIncludeDirGenerator,
	// 	CMakeGlobalLibraryGenerator,
	// 	CMakePlatformLibraryGenerator,
	// 	CMakeTargetIncludeDirGenerator
	// ]

	// protected getGenerators(): (new (_varSafeUid: string) => PropertyGenerator<Project>)[] {
	// 	return ProjectCMakeFileGenerator.propertyGenerators;
	// }
}