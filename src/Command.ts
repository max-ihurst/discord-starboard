import { Client, CommandInteraction, PermissionResolvable } from 'discord.js';

export default interface Command {
    name: string;
    permission?: PermissionResolvable[];
    client?: Client;
    execute(interaction: CommandInteraction): Promise<void> | void;
}