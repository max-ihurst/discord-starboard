import {channelMention} from '@discordjs/builders';
import { Client, CommandInteraction, Permissions } from 'discord.js';
import Command from '../Command';

export default class StarboardCommand implements Command {
    public client: Client;
    public name = 'starboard';
    public permission = [Permissions.FLAGS.MANAGE_GUILD];

    public constructor(client: Client) {
        this.client = client;
    }

	public async execute(interaction: CommandInteraction): Promise<void> {
        const channel = interaction.options.getChannel('channel');
        await this.client.settings.set(interaction.guild!.id, 'board', channel?.id);
        interaction.reply({ content: `Sucessfully set starboard to ${channelMention(channel!.id)}.`, ephemeral: true });
    }
}