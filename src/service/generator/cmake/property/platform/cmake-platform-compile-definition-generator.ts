import { Platform } from "../../../../../model/project/platform/platform";
import { PlatformPropertyGenerator } from "./cmake-platform-property-generator";

export class CMakeplatformCompileDefinitionGenerator extends PlatformPropertyGenerator
{
	generate(_value: Platform, _fileContent: string[]): void {
		
		if(!_value.compileDefinitions)
		{
			return;
		}

		_fileContent.push('# Set compile definitions')
		
		let definitionsLine: string = '';

		for (const definition of _value.compileDefinitions) 
		{
			definitionsLine += ` "${definition}"`;
		}

		_fileContent.push(`target_compile_definitions("${this.project.name}" PUBLIC${definitionsLine})`);
	}	
}