import { Client, CommandInteraction } from 'discord.js';
import GuildModel from '../../models/Guild';
import Command from '../../Command';
import {bold} from '@discordjs/builders';

export default class StarLimitCommand implements Command {
	public client: Client;
	public name = 'star-limit';

	public constructor(client: Client) {
		this.client = client;
	}

	public async execute(interaction: CommandInteraction): Promise<void> {
        const limit = interaction.options.getNumber('limit') as number;
        
        try {
            const doc = await GuildModel.findOne({ guild: interaction.guild?.id })
                || new GuildModel({ guild: interaction.guild?.id });

            doc.limit = limit;
            await doc.save();
            interaction.reply({ content: `Sucessfully set that star limit to ${bold(limit.toString())}.`, ephemeral: true });
        } catch (e) {
            interaction.reply({ content: 'There was an error updating the star limit!', ephemeral: true });
            console.log(e);
        }
	}
}