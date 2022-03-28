import { Client, MessageReaction } from 'discord.js';
import StarModel from '../../models/Star';
import * as Constants from '../../Constants';
import Listener from '../../Listener';

const { EMOJI } = Constants;

export default class MessageReactionAddListener implements Listener {
    public client: Client;
    public name = 'messageReactionAdd';

	public constructor(client: Client) {
        this.client = client;
    }

	public async execute(reaction: MessageReaction): Promise<void> {
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                return;
            }
        }

        if (reaction.emoji.name != EMOJI) return;
        const { message } = reaction;

        const doc = new StarModel({ 
            guild: message.guild?.id, 
            channel: message.channel.id, 
            message: message.id 
        });

        await doc.save();
    }
}