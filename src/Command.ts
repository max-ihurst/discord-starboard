import { Client, CommandInteraction } from 'discord.js';

export default interface Command {
    name: string;
    client?: Client;
    execute(interaction: CommandInteraction): Promise<void> | void;
}