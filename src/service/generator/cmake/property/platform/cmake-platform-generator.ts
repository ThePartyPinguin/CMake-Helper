import { PlatformType } from "../../../../../model/project/platform/platform";
import { Project } from "../../../../../model/project/project";
import { PropertyGenerator } from "../../../property/property-generator";
import { CMakePlatformChildProjectGenerator } from "./cmake-platform-child-project-generator";
import { CMakePlatformLibraryGenerator } from "./cmake-platform-library-generator";
import { CMakePlatformPackageGenerator } from "./cmake-platform-package-generator";
import { CMakePlatformProjectLinkGenerator } from "./cmake-platform-project-link-generator";
import { PlatformPropertyGenerator } from "./cmake-platform-property-generator";

export class CMakePlatformGenerator extends PropertyGenerator<Project>
{
	private static generators:  (new(_project: Project, _varSafeFileName: string) => PlatformPropertyGenerator)[]= [
		CMakePlatformChildProjectGenerator,
		CMakePlatformLibraryGenerator,
		CMakePlatformPackageGenerator,
		CMakePlatformProjectLinkGenerator
	]

	generate(_value: Project, _fileContent: string[]): void {

		if(!_value.platform)
		{
			return;
		}

		const platformTypes = <PlatformType[]>Object.keys(_value.platform);

		for (const type of platformTypes) 
		{
			const platformContents: string[] = [];

			for (const generator of CMakePlatformGenerator.generators) 
			{
				var generatorInstance = new generator(_value, this._varSafeUid);
				generatorInstance.generate(_value.platform[type], platformContents);
			}

			if(platformContents.length > 0)
			{
				_fileContent.push(`if(${type.toUpperCase()})`);
				_fileContent.push(...platformContents);
				_fileContent.push('endif()');
			}
		}
	}
}