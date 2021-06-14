import * as vscode from 'vscode'
import { Library, LibraryType } from "../../../../model/project/library/library";
import { Project } from "../../../../model/project/project";
import { Visibility } from "../../../../model/project/visibility";
import { EnumToString } from "../../../../util/enum-to-string";
import { CMakeGeneratorHelper } from "../cmake-generator-helper";
import { CMakeVariable } from "../cmake-variable";

export class CMakeLibraryGenerator
{
	generateLibrary(
		_project: Project, _libraryName: string, _library: Library,
		_libraryType: LibraryType, _visibility: Visibility, _fileContent: string[], _indent: boolean = false) {

		if(!_library.includeDirectories)
		{
			return;
		}

		const indentation: string = _indent ? '\t' : '';

		let targetIncludeLibOrPackageCommentString: string = '# ERROR: No package or lib target include comment set';
		let targetIncludeLibOrPackageString: string = 'ERROR: No package or lib target include set';
		if(_libraryType === LibraryType.PACKAGE)
		{
			if(!_library.packageLibrary)
			{
				vscode.window.showErrorMessage(`Error generating project: ${_project.name}. Package: ${_libraryName} does not have a packageLibrary defined!`);
				return;
			}

			let packageLibraryString: string = '';

			if(typeof _library.packageLibrary === 'string')
			{
				packageLibraryString = ` ${_library.packageLibrary}`;
			}
			else
			{
				for (const lib of _library.packageLibrary) {
					packageLibraryString = `${packageLibraryString} ${lib}`;
				}
			}

			_fileContent.push(`${indentation}# Find and require ${_libraryName}`);
			_fileContent.push(`${indentation}find_package(${_libraryName} REQUIRED)`);
			targetIncludeLibOrPackageCommentString = `${indentation}# Add target link to ${_libraryName} package library`;
			targetIncludeLibOrPackageString = `${indentation}target_link_libraries("${_project.name}"${packageLibraryString})`;
		}

		if(_libraryType === LibraryType.PROJECT || _libraryType == LibraryType.LIBRARY)
		{
			targetIncludeLibOrPackageCommentString = `${indentation}# Link ${_libraryName} ${EnumToString.convert(_libraryType)}`;
			targetIncludeLibOrPackageString = `${indentation}target_link_libraries("${_project.name}" ${_libraryName})`;
		}

		const includeVisibilities = <Visibility[]>Object.keys(_library.includeDirectories);

		for (const includeVisibility of includeVisibilities) {
			const directories = _library.includeDirectories[includeVisibility];

			const directoryListVarName = CMakeGeneratorHelper.formatVisibilityVarString(_project.name, includeVisibility, CMakeVariable.LIBRARY_INCLUDE_DIR_LIST);

			_fileContent.push(`${indentation}# ${_libraryName} ${EnumToString.convert(includeVisibility)} include directories`);

			for (const directory of directories) {
				_fileContent.push(`${indentation}list(APPEND "${directoryListVarName}" "${directory}")`);
			}
		}

		_fileContent.push(targetIncludeLibOrPackageCommentString);
		_fileContent.push(targetIncludeLibOrPackageString);
	}
}