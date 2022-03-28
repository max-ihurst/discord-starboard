import { Client, Intents, Collection } from 'discord.js';
import Command from '../Command';
import * as recursive from 'recursive-readdir';
import * as path from 'path'

declare module 'discord.js' {
    interface Client {
        commands: Collection<string, Command>
    }
}

export default class client extends Client {
    public commands: Collection<string, Command>;

    public constructor() {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_MESSAGES,
            ]
        });

        this.commands = new Collection();

        this.loadCommands();
        this.loadListeners();
    }

    public async loadCommands(): Promise<void> {
        const files = await recursive('./src/commands');
        for (const file of files) {
            let command = (await require(path.resolve(file))).default
            command = new command();
            this.commands.set(command.name, command);
        }
    }

    public async loadListeners(): Promise<void> {
        const files = await recursive('./src/listeners');
        for (const file of files) {
            let listener = (await require(path.resolve(file))).default
            listener = new listener();

            if (listener.once) {
                this.once(listener.name, (...args) => listener.execute(...args));
            } else {
                this.on(listener.name, (...args) => listener.execute(...args));
            }
        }
    }
}