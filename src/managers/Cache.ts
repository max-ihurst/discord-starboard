import { Collection } from 'discord.js';
import * as mongoose from 'mongoose';

export default class CacheManager {
    public model: mongoose.Model<any>;
    public cache: Collection<string, any>;

    public constructor(model: mongoose.Model<any>) {
        this.model = model;

        this.cache = new Collection();

        this.init();
    }

    public set(key: string, value: any): void {
        this.cache.set(key, value);
    }

    public delete(id: string): void {
        this.cache.delete(id);
    }

    public get(query: string): any {
        return this.cache.get(query);
    }

    public async init(): Promise<void> {
        const documents = await this.model.find();

        for (const doc of documents) {
            this.cache.set(doc.id, doc);
        }
    }
}