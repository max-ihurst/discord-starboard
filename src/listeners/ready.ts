import { Client } from 'discord.js';
import Listener from '../Listener';
import StarsModel from '../models/Star';
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

        const stars = await StarsModel.find();
        for (const star of stars) {
            this.client.stars.set(star.primal, star);
        }

        console.log('Yoo this is ready!');
    }
}