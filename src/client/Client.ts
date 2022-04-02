import { Client, Intents } from 'discord.js';
import StarModel from '../models/Star';
import ServerModel from '../models/Server';
import SettingsManager from '../managers/Settings';
import CacheManager from '../managers/Cache';
import CommandHandler from '../handlers/Command';
import ListenerHandler from '../handlers/Listener';

declare module 'discord.js' {
    interface Client {
        commandHandler: CommandHandler;
        listenerHandler: ListenerHandler;
        settings: SettingsManager;
        servers: CacheManager;
        stars: CacheManager;
    }
}

export default class client extends Client {
    public commandHandler: CommandHandler;
    public listenerHandler: ListenerHandler;
    public settings: SettingsManager;
    public servers: CacheManager;
    public stars: CacheManager;

    public constructor() {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS
            ],

            partials: [
                'USER', 
                'REACTION', 
                'MESSAGE'
            ]
        });

        this.commandHandler = new CommandHandler(this);
        this.listenerHandler = new ListenerHandler(this);

        this.settings = new SettingsManager(this);

        this.stars = new CacheManager(StarModel);
        this.servers = new CacheManager(ServerModel)

        this.load();
    }

    public load (): void {
        this.commandHandler.load();
        this.listenerHandler.load();
    }
}