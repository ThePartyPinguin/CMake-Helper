import { Platform } from "../../../../../model/project/platform/platform";
import { PlatformPropertyGenerator } from "./cmake-platform-property-generator";

export class CMakePlatformChildProjectGenerator extends PlatformPropertyGenerator
{
	generate(_value: Platform, _fileContent: string[]): void {
		
		if(!_value.childProjects)
		{
			return;
		}

		_fileContent.push('# Add child projects')
		for (const childProject of _value.childProjects) 
		{
			_fileContent.push(`add_subdirectory("${childProject}")`);
		}

	}	
}