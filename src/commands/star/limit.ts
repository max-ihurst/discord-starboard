import { Client, CommandInteraction, Permissions } from 'discord.js';
import { bold } from '@discordjs/builders';
import Command from '../../Command';

export default class StarLimitCommand implements Command {
    public client: Client;
    public name = 'star-limit';
    public permission = [Permissions.FLAGS.MANAGE_GUILD];

    public constructor(client: Client) {
        this.client = client;
    }

    public async execute(interaction: CommandInteraction): Promise<void> {
        const limit = interaction.options.getNumber('limit') as number;
        await this.client.settings.set(interaction.guild!.id, 'limit', limit);

        interaction.reply({
            content: `Sucessfully set that star limit to ${bold(
                limit.toString()
            )}.`,
            ephemeral: true,
        });
    }
}
