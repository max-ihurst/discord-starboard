import { Client, CommandInteraction } from 'discord.js';
import Listener from '../../Listener';

export default class InteractionCreateListener implements Listener {
    public client: Client;
    public name = 'interactionCreate';

    public constructor(client: Client) {
        this.client = client;
    }

	public async execute(interaction: CommandInteraction): Promise<void> {
        if (!interaction.isCommand()) return;
        
        const name = interaction.commandName;
        const subcommand = interaction.options.getSubcommand(false);
        const cmd = this.client.commandHandler.modules.get(`${name}-${subcommand}`)
            || this.client.commandHandler.modules.get(name);

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