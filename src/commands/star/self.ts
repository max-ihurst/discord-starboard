import { Client, CommandInteraction } from 'discord.js';
import { bold } from '@discordjs/builders';
import GuildModel from '../../models/Guild';
import Command from '../../Command';

export default class StarSelfCommand implements Command {
	public client: Client;
	public name = 'star-self';

	public constructor(client: Client) {
		this.client = client;
	}

	public async execute(interaction: CommandInteraction): Promise<void> {
        const toggle = interaction.options.getBoolean('toggle') as boolean;
        
        try {
            const doc = await GuildModel.findOne({ guild: interaction.guild?.id })
                || new GuildModel({ guild: interaction.guild?.id });

            doc.self = toggle;
            await doc.save();
            interaction.reply({ content: `Sucessfully set self star to ${bold(toggle.toString())}.`, ephemeral: true });
        } catch (e) {
            interaction.reply({ content: 'There was an error updating the self star!', ephemeral: true });
            console.log(e);
        }
	}
}