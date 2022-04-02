import { Client, Collection } from 'discord.js';
import Lst from '../Listener';
import * as recursive from 'recursive-readdir';
import * as path from 'path';

export default class Listener {
    public modules: Collection<string, Lst>;
    public client: Client;

    public constructor(client: Client) {
        this.modules = new Collection();
        this.client = client;
    }

    public async load(): Promise<void> {
        const files = await recursive('./src/listeners');
        for (const file of files) {
            let listener = (await require(path.resolve(file))).default;
            listener = new listener(this.client);
            listener.client = this.client;

            if (listener.once) {
                this.client.once(listener.name, listener.execute.bind(listener))
            } else {
                this.client.on(listener.name, listener.execute.bind(listener))
            }

            this.modules.set(listener.name, listener);
        }
    }
}