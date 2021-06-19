import { Platform } from "../../../../../model/project/platform/platform";
import { PlatformPropertyGenerator } from "./cmake-platform-property-generator";

export class CMakePlatformProjectLinkGenerator extends PlatformPropertyGenerator
{
	generate(_value: Platform, _fileContent: string[]): void {

		if(!_value.projectLinks)
		{
			return;
		}

		for (const pl of _value.projectLinks) {
			_fileContent.push(`\t# Link project ${pl}`);
			_fileContent.push(`\ttarget_link_libraries("${this.project.name}" "${pl}")`);	
		}
	}
}