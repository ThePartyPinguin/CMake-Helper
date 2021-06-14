import { LibraryType } from "../../../../model/project/library/library";
import { Platform, PlatformType } from "../../../../model/project/platform/platform";
import { Project } from "../../../../model/project/project";
import { Visibility } from "../../../../model/project/visibility";
import { PropertyGenerator } from "../../property/property-generator";
import { CMakeLibraryGenerator } from "./cmake-library-generator";

export class CMakePlatformLibraryGenerator extends PropertyGenerator
{
	generate(_project: Project, _fileContent: string[]): void {
		const definedPlatforms = <PlatformType[]>Object.keys(_project.platform);

		_fileContent.push('# Set Target libraries');

		const libraryGenerator: CMakeLibraryGenerator = new CMakeLibraryGenerator();
		
		for (const platformType of definedPlatforms) {
			const platform: Platform = _project.platform[platformType];

			if(!platform.libraries)
			{
				continue;
			}

			_fileContent.push(`if(${platformType.toUpperCase()})`);

			const libraryVisibilities = <Visibility[]>Object.keys(platform.libraries);

			for (const visibility of libraryVisibilities) {
				const librariesPerType = platform.libraries[visibility];
				const types = <LibraryType[]>Object.keys(librariesPerType);

				for (const type of types) {
					const librariesByName = librariesPerType[type];
					const names = <string[]>Object.keys(librariesByName);

					for (const name of names) {
						const library = librariesByName[name];

						libraryGenerator.generateLibrary(_project, name, library, type, visibility, _fileContent, true);
					}
				}
			}
			_fileContent.push(`endif()`);
		}
	}	
}