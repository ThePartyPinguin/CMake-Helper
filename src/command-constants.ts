import { CommandInfo } from "./model/command-info";

export class CommandConstants
{
	static cmakeHelperInitCommand: CommandInfo = {
		command: "cmake-helper.init",
		title: "CMakeHelper: init"
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

	static cmakeHelperGenerateProjects: CommandInfo = {
		command: 'cmake-helper.generate',
		title: 'CMakeHelper: Generate'
	};
}