import { Project } from "../../../../model/project/project";
import { ProjectLanguage } from "../../../../model/project/project-language";
import { PropertyGenerator } from "../../property/property-generator";

export class CMakeProjectLanguageGenerator extends PropertyGenerator
{
	generate(_project: Project, _fileContent: string[]): void {
		const languages = <ProjectLanguage[]>Object.keys(_project.language);

		for (const language of languages) {

			_fileContent.push(`# Set ${language} standard`);
			_fileContent.push(`set(CMAKE_${language}_STANDARD_REQUIRED true)`);
			_fileContent.push(`set(CMAKE_${language}_STANDARD ${_project.language[language]})`);
		}
	}	
}