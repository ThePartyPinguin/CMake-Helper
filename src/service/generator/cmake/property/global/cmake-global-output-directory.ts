import { Project } from "../../../../../model/project/project";
import { PropertyGenerator } from "../../../property/property-generator";

export class CMakeGlobalOuputDirGenerator extends PropertyGenerator<Project>
{
	generate(_value: Project, _fileContent: string[]): void {
		
		if(!_value.outputDirectory)
		{
			return;
		}

		_fileContent.push('# Set binary output directory')
		_fileContent.push(`set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "\${CMAKE_SOURCE_DIR}/${_value.outputDirectory}/\${CMAKE_BUILD_TYPE}")`);
		_fileContent.push(`set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "\${CMAKE_SOURCE_DIR}/${_value.outputDirectory}/\${CMAKE_BUILD_TYPE}")`);
		_fileContent.push(`set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "\${CMAKE_SOURCE_DIR}/${_value.outputDirectory}/\${CMAKE_BUILD_TYPE}")`);
	}	
}