export class RegexConstants
{
	static projectNameRegex: string = '^[0-9a-z-_=\.]+$';
	static relativeDirectoryRegex: string = '^(?!\/)[\\w/-_\.]+(?<!\/)$';
}