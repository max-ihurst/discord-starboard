import { Client } from 'discord.js';
import { Settings } from '../types/types';
import * as mongoose from 'mongoose';
import ServerModel from '../models/Server';

interface S {
    client: Client;
    set(id: string, key: string, value: any): Promise<void>;
}

export default class SettingsManager implements S {
    public client: Client;

    public constructor(client: Client) {
        this.client = client;
    }

    public async set(id: string, key: Settings, value: any): Promise<void> {
        let doc = await ServerModel.findOne({ guild: id }) as mongoose.Document;
        
        if (!doc) {
            doc = new ServerModel({ guild: id });
        }

        doc.set(key, value);
        await doc.save();
        this.client.servers.set(id, doc);
    }
}