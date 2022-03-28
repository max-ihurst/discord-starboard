import { Client, Intents, Collection } from 'discord.js';
import CommandHandler from '../handlers/Command';
import ListenerHandler from '../handlers/Listener';
import { Star } from '../types/types';

declare module 'discord.js' {
    interface Client {
        commandHandler: CommandHandler;
        listenerHandler: ListenerHandler;
        stars: Collection<string, Star>
    }
}

export default class client extends Client {
    public commandHandler: CommandHandler;
    public listenerHandler: ListenerHandler;
    public stars: Collection<string, Star>;

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

        this.stars = new Collection();

        this.load();
    }

    public load (): void {
        this.commandHandler.load();
        this.listenerHandler.load();
    }
}