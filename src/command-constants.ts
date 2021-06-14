import { CommandInfo } from "./model/command-info";

export class CommandConstants
{
	static create: CommandInfo = {
		command: "cmake-helper-v2.create-project",
		title: "CMakeHelper V2: Create project"
	};
	
	static cmakeHelperAddFileCommand: CommandInfo = {
		command: 'cmake-helper.add-file',
		title: 'CMakeHelper: Add file'
	};

	static cmakeHelperCreateChildProjectCommand: CommandInfo = {
		command: 'cmake-helper.add-project',
		title: 'CMakeHelper: Add project'
	};

	static cmakeHelperLinkProjectCommand: CommandInfo = {
		command: 'cmake-helper.link-project',
		title: 'CMakeHelper: Link project'
	};

	static generate: CommandInfo = {
		command: 'cmake-helper-v2.generate',
		title: 'CMakeHelper V2: Generate'
	};
}