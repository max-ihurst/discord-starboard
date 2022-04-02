import { Client, Collection } from 'discord.js';
import Cmd from '../Command';
import * as recursive from 'recursive-readdir';
import * as path from 'path';

export default class Command {
    public modules: Collection<string, Cmd>;
    public client: Client;

    public constructor(client: Client) {
        this.modules = new Collection();
        this.client = client;
    }

    public async load(): Promise<void> {
        const files = await recursive('./src/commands');
        for (const file of files) {
            let command = (await require(path.resolve(file))).default;
            command = new command(this.client);
            
            this.modules.set(command.name, command);
        }
    }
}