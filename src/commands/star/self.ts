import { Client, CommandInteraction } from 'discord.js';
import { bold } from '@discordjs/builders';
import Command from '../../Command';

export default class StarSelfCommand implements Command {
	public client: Client;
	public name = 'star-self';

	public constructor(client: Client) {
		this.client = client;
	}

	public async execute(interaction: CommandInteraction): Promise<void> {
        const toggle = interaction.options.getNumber('toggle') as number;
        await this.client.settings.set(interaction.guild!.id, 'self', toggle);
        interaction.reply({ content: `Sucessfully set self star to ${bold(toggle.toString())}.`, ephemeral: true });
    }
}