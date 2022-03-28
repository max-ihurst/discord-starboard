import { CommandInteraction } from 'discord.js';
import Listener from '../../Listener';

export default class InteractionCreateListener implements Listener {
    public name = 'interactionCreate';

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public constructor() {}

	public async execute(interaction: CommandInteraction): Promise<void> {
        if (!interaction.isCommand()) return;
        
        const { commandName } = interaction;
        const cmd = interaction.client.commands.get(commandName);

        if (cmd) {
            try {
                cmd.execute(interaction);
            } catch (e) {
                interaction.reply('There was an error running this command!');
                console.log(e);
            }
        }
	}
}