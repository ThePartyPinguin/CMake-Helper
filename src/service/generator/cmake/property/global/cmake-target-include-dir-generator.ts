import { PlatformType } from "../../../../../model/project/platform/platform";
import { Project } from "../../../../../model/project/project";
import { PropertyGenerator } from "../../../property/property-generator";
import { CMakeGeneratorHelper } from "../../cmake-generator-helper";
import { CMakeVariable } from "../../cmake-variable";

export class CMakeTargetIncludeDirGenerator extends PropertyGenerator<Project>
{
	generate(_project: Project, _fileContent: string[]): void {

		const shouldGenerate = this.shouldGenerate(_project);

		if(!shouldGenerate)
		{
			return;
		}

		const directoryListVarName = CMakeGeneratorHelper.formatVarString(_project.name, CMakeVariable.INCLUDE_DIR_LIST);

		_fileContent.push('# Set target include directories');
		_fileContent.push(`target_include_directories("${_project.name}" PUBLIC "\${${directoryListVarName}}")`);
	}

	private shouldGenerate(_project: Project): boolean
	{
		const hasGlobalIncludes = _project.includeDirectories && _project.includeDirectories.length > 0;
		let hasPlatformIncludes = false;
		if(_project.platform)
		{
			const types = <PlatformType[]>Object.keys(_project.platform);
			
			for (const type of types) {

				const includes = _project.platform[type].includeDirectories

				const hasIncludes = includes && includes.length > 0;

				if(hasIncludes)
				{
					hasPlatformIncludes = true;
					break;
				}
			}
		}

		return hasGlobalIncludes || hasPlatformIncludes;
	}
}