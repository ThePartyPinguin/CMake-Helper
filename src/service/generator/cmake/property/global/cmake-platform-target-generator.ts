import { Platform, PlatformType } from "../../../../../model/project/platform/platform";
import { Project } from "../../../../../model/project/project";
import { ProjectType } from "../../../../../model/project/project-type";
import { PropertyGenerator } from "../../../property/property-generator";
import { CMakeGeneratorHelper } from "../../cmake-generator-helper";
import { CMakeVariable } from "../../cmake-variable";

export class CMakePlatformTargetGenerator extends PropertyGenerator<Project>
{
	generate(_value: Project, _fileContent: string[]): void {

		if(!_value.type || !_value.platform)
		{
			return;
		}

		const definedPlatforms = <PlatformType[]>Object.keys(_value.platform);

		let targetLinePrefix: string = '';
		let targetTypeAddition: string = '';
		
		switch(_value.type)
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
			const platform: Platform = _value.platform[platformType];

			_fileContent.push(`if(${platformType.toUpperCase()})`);
			_fileContent.push(`\tmessage("Buidling for: ${platformType.toUpperCase()}")`);


			const sourceVarName = CMakeGeneratorHelper.formatVarString(this._varSafeUid, CMakeVariable.PROJECT_SOURCE_FILES);

			if(_value.type === ProjectType.EXECUTABLE && platform.binary.useTargetSubSystem)
			{
				targetTypeAddition = this._getTargetPlatformSubSystem(platformType);
			}
			_fileContent.push(`\t${targetLinePrefix}("${_value.name}" ${targetTypeAddition}"\${${sourceVarName}}")`);

			_fileContent.push('\t# Set binary name');
			_fileContent.push(`\tset_target_properties("${_value.name}" PROPERTIES OUTPUT_NAME "${platform.binary.name}")`);

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