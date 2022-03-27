import { CommandInteraction } from 'discord.js';
import GuildModel from '../models/Guild';
import Command from '../Command';

export default class StarboardCommand extends Command {
	public constructor() {
		super('starboard');
	}

	public async execute(interaction: CommandInteraction): Promise<void> {
		const channel = interaction.options.getChannel('channel');
        
        try {
            const doc = await GuildModel.findOne({ guild: interaction.guild?.id })
                || new GuildModel({ guild: interaction.guild?.id });

            doc.board = channel!.id;
            await doc.save();
            interaction.reply({ content: `Sucessfully updated the board channel to ${channel}.`, ephemeral: true });
        } catch (e) {
            interaction.reply({ content: 'There was an error updating the board channel!', ephemeral: true });
            console.log(e);
        }
	}
}