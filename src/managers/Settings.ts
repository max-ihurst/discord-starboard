import { Client } from 'discord.js';
import { Settings } from '../types/types';
import * as mongoose from 'mongoose';
import ServerModel from '../models/Server';

export default class SettingsManager {
    public client: Client;

    public constructor(client: Client) {
        this.client = client;
    }

    public async set(id: string, key: Settings, value: any): Promise<void> {
        let doc = (await ServerModel.findOne({ id: id })) as mongoose.Document;

        if (!doc) {
            doc = new ServerModel({ id: id });
        }

        doc.set(key, value);
        await doc.save();
        this.client.servers.set(id, doc);
    }
}
