
const isEnum = <T>(e: T) => (token: any): token is T[keyof T] => Object.values(e).includes(token as T[keyof T]);

export class EnumToString
{
	static convert<TEnum>(_enumValue: TEnum, capitalize: boolean = false): string
	{
		if(!isEnum(_enumValue))
		{
			return `UNKNOWN_ENUM_TYPE: ${_enumValue}`;
		}

		const enumString = (<string><unknown>_enumValue);
		if (capitalize)
		{
			return enumString.substr(0, 1).toUpperCase() + enumString.substr(1).toLowerCase();
		}

		return enumString;
	}
}