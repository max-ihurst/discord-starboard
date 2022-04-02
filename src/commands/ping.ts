import { Client, CommandInteraction, Message } from 'discord.js';
import Command from '../Command';

export default class PingCommand implements Command {
    public client: Client;
    public name = 'ping';

    public constructor(client: Client) {
        this.client = client;
    }

    public async execute(interaction: CommandInteraction): Promise<void> {
        await interaction.deferReply({ ephemeral: true });
        const msg = await interaction.fetchReply() as Message;
        const latency = msg.createdTimestamp - interaction.createdTimestamp;
        interaction.editReply(`🏓Latency is ${latency}ms.`);
    }
}