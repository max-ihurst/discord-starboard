import { CommandInteraction } from 'discord.js';
import Command from '../Command';

export default class PingCommand implements Command {
	public name = 'ping';

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public constructor() {}

	execute(interaction: CommandInteraction): void {
		interaction.reply(`🏓Latency is ${Date.now() - interaction.createdTimestamp}ms.`);
	}
}