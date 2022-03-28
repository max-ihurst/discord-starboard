import { Client, CommandInteraction } from 'discord.js';
import Command from '../Command';

export default class PingCommand implements Command {
	public client: Client;
	public name = 'ping';

	public constructor(client: Client) {
		this.client = client;
	}

	execute(interaction: CommandInteraction): void {
		interaction.reply(`🏓Latency is ${Date.now() - interaction.createdTimestamp}ms.`);
	}
}