import { Client, CommandInteraction, Permissions } from 'discord.js';
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
        let cmd = this.client.commandHandler.modules.get(name + '-' + subcommand);

        if (!cmd) {
            cmd = this.client.commandHandler.modules.get(name);
        }

        if (cmd) {
            const permissions = interaction.member?.permissions as Permissions;
            if (cmd.permission?.length && !permissions.has(cmd.permission)) {
                interaction.reply({ content: 'You don\'t have permission to use ths command!', ephemeral: true });
            } else {
                try {
                    cmd.execute(interaction);
                } catch (e) {
                    interaction.reply({ content: 'There was an error running this command!', ephemeral: true });
                    console.log(e);
                }
            }
        }
    }
}