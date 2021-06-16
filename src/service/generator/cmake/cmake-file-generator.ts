import { GeneratedFileInfo } from "../generated-file-info";
import { PropertyGenerator } from "../property/property-generator";

export abstract class CMakeFileGenerator<TValue>
{
	static minimalCMakeVersion: string = '3.16.0';

	generateFileLines(_value: TValue, _varSafeUid: string): string[] {
		const cmakeFileContents: string[] = [];

		var generators = this.getGenerators();

		for (const generator of generators) {
			const instance = new generator(_varSafeUid);
			instance.generate(_value, cmakeFileContents);
		}

		return cmakeFileContents;
	}

	protected abstract getGenerators(): ((new (_varSafeUid: string) => PropertyGenerator<TValue>))[]
}