import { BaseCommandInteraction } from 'discord.js';

interface Cmd {
	name?: string;
	execute(interaction: BaseCommandInteraction): void | Promise<void>;
}

export default class Command implements Cmd {
    public name?: string;

    constructor(tag: string) {
        this.name = tag;
    }

    execute(interaction: BaseCommandInteraction<'raw'>): void {
        throw new Error('Method not implemented.');
    }
}