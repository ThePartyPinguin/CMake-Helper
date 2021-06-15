import { Platform, PlatformType } from "../../../../model/project/platform/platform";
import { Project } from "../../../../model/project/project";
import { ProjectType } from "../../../../model/project/project-type";
import { PropertyGenerator } from "../../property/property-generator";
import { CMakeGeneratorHelper } from "../cmake-generator-helper";
import { CMakeVariable } from "../cmake-variable";

export class CMakePlatformTargetGenerator extends PropertyGenerator
{
	generate(_project: Project, _fileContent: string[]): void {
		const definedPlatforms = <PlatformType[]>Object.keys(_project.platform);

		let targetLinePrefix: string = '';
		let targetTypeAddition: string = '';
		
		switch(_project.type)
		{
			case ProjectType.EXECUTABLE:
			{
				targetLinePrefix = 'add_executable';
				break;
			}
			case ProjectType.STATIC_LIB:
			{
				targetLinePrefix = 'add_library';
				targetTypeAddition = 'STATIC ';
				break;
			}
			case ProjectType.SHARED_LIB:
			{
				targetLinePrefix = 'add_library';
				targetTypeAddition = 'SHARED ';
				break;
			}
		}

		_fileContent.push('# Set Target');

		for (const platformType of definedPlatforms) {
			const platform: Platform = _project.platform[platformType];

			_fileContent.push(`if(${platformType.toUpperCase()})`);

			const sourceVarName = CMakeGeneratorHelper.formatVarString(this._varSafeProjectName, CMakeVariable.PROJECT_SOURCE_FILES);

			if(_project.type === ProjectType.EXECUTABLE && platform.binary.useTargetSubSystem)
			{
				targetTypeAddition = this._getTargetPlatformSubSystem(platformType);
			}
			_fileContent.push(`\t${targetLinePrefix}("${_project.name}" ${targetTypeAddition}\${${sourceVarName}})`);

			_fileContent.push('\t# Set binary name');
			_fileContent.push(`\tset_target_properties("${_project.name}" PROPERTIES OUTPUT_NAME "${platform.binary.name}")`);

			_fileContent.push(`endif()`);

		}
	}

	private _getTargetPlatformSubSystem(_platform: PlatformType): string
	{
		switch(_platform)
		{
			case PlatformType.win32:
				return 'WIN32 ';
			case PlatformType.apple:
				return 'MACOSX_BUNDLE ';
			default:
				return '';
		}
	}
}