export class RegexConstants
{
	static projectNameRegex: string = '^[0-9a-z-_\.]+$';
	static relativeDirectoryRegex: string = '^(?!\/)[\\w/-_\.]+(?<!\/)$';
	static sourceFileRegex: string = '([\\w/\\-_\\.]+)(\\.(c|h|cpp|hpp))$';
}