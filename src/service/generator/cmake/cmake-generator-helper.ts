import { Visibility } from "../../../model/project/visibility";
import { CMakeVariable } from "./cmake-variable";

export class CMakeGeneratorHelper
{
	public static formatVarSafeString(_value: string): string
	{
		const regex = /[-.]/;
		return _value.split(regex).join('_').toUpperCase();
	}

	public static formatVarString(_varSafeName: string, _variable: CMakeVariable): string
	{
		return `${_varSafeName}_${_variable}`
	}

	public static formatVisibilityVarString(_varSafeName: string, _visibility: Visibility, _variable: CMakeVariable): string
	{
		return `${_varSafeName}_${_visibility}_${_variable}`
	}
}