import { Library, LibraryType } from "../../../../model/project/library/library";
import { Project } from "../../../../model/project/project";
import { Visibility } from "../../../../model/project/visibility";
import { CMakeGeneratorHelper } from "../cmake-generator-helper";
import { CMakeVariable } from "../cmake-variable";

export class CMakeLibraryGenerator
{
	generateLibrary(_project: Project, _libraryName: string, _library: Library, _libraryType: LibraryType, _visibility: Visibility, _fileContent: string[]) {

		if(!_library.includeDirectories)
		{
			return;
		}

		if(_libraryType === LibraryType.PACKAGE)
		{
			_fileContent.push(`find_package(${_libraryName} REQUIRED)`)
		}

		const includeVisibilities = <Visibility[]>Object.keys(_library.includeDirectories);

		for (const includeVisibility of includeVisibilities) {
			const directories = _library.includeDirectories[includeVisibility];

			const directoryListVarName = CMakeGeneratorHelper.formatVisibilityVarString(_libraryName, includeVisibility, CMakeVariable.LIBRARY_INCLUDE_DIR_LIST);

			for (const directory of directories) {
				_fileContent.push(`list(APPEND ${directoryListVarName} "${directory}")`);
			}

			_fileContent.push(`target_include_directories("${_project.name}" "\${${directoryListVarName}}")`);
		}
	}
}