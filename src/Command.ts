import { CommandInteraction } from 'discord.js';

interface Cmd {
	name?: string;
	execute(interaction: CommandInteraction): void | Promise<void>;
}

export default class Command implements Cmd {
    public name?: string;

    constructor(tag: string) {
        this.name = tag;
    }

    execute(interaction: CommandInteraction): void {
        throw new Error('Method not implemented.');
    }
}