import { Client, MessageReaction } from 'discord.js';
import Listener from '../../Listener';

export default class MessageReactionRemoveListener implements Listener {
    public client: Client;
    public name = 'messageReactionRemove';

	public constructor(client: Client) {
        this.client = client;
    }

	public async execute(reaction: MessageReaction): Promise<void> {
        const listener = this.client.listenerHandler.modules.get('messageReactionAdd');
        listener?.execute(reaction);
    }
}