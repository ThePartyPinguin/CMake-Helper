import { Library, LibraryType } from "../../../../model/project/library/library";
import { Project } from "../../../../model/project/project";
import { Visibility } from "../../../../model/project/visibility";
import { PropertyGenerator } from "../../property/property-generator";
import { CMakeLibraryGenerator } from "./cmake-library-generator";

export class CMakeGlobalLibraryGenerator extends PropertyGenerator
{
	generate(_project: Project, _fileContent: string[]): void {
		
		if(!_project.libraries)
		{
			return;
		}

		const libraryGenerator: CMakeLibraryGenerator = new CMakeLibraryGenerator();

		const libraryVisibilities = <Visibility[]>Object.keys(_project.libraries);

		for (const visibility of libraryVisibilities) {
			const librariesPerType = _project.libraries[visibility];
			const types = <LibraryType[]>Object.keys(librariesPerType);

			for (const type of types) {
				const librariesByName = librariesPerType[type];
				const names = <string[]>Object.keys(librariesByName);

				for (const name of names) {
					const library = librariesByName[name];

					libraryGenerator.generateLibrary(_project, name, library, type, visibility, _fileContent);
				}
			}
		}
	}	
}