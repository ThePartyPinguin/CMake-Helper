import { Project } from "../../../../../model/project/project";
import { PropertyGenerator } from "../../../property/property-generator";

export class CMakeGlobalCompileDefinitionGenerator extends PropertyGenerator<Project>
{
	generate(_value: Project, _fileContent: string[]): void {
		
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

		_fileContent.push(`target_compile_definitions("${_value.name}" PUBLIC${definitionsLine}")`);
	}	
}