import { Client } from 'discord.js';
import Listener from '../Listener';
import * as mongoose from 'mongoose';

export default class ReadyListener implements Listener {
    public client: Client;
    public name = 'ready';
    public once = true;

	public constructor(client: Client) {
        this.client = client;
    }

	public async execute(): Promise<void> {
		await mongoose.connect(process.env.MONGO_URI!);
        console.log('Yoo this is ready!');
	}
}