import { Client, MessageReaction, TextChannel, MessageEmbed, Message, User } from 'discord.js';
import { channelMention, hyperlink } from '@discordjs/builders';
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

	public async execute(reaction: MessageReaction, user: User): Promise<void> {
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (err) {
                console.error(err);
                return;
            }
        }

        if (reaction.emoji.name != EMOJI) return;
        const { message } = reaction;
        const star = this.client.stars.get(message.id);

        const embed = new MessageEmbed()
            .setAuthor({ name: message.author!.tag, iconURL: message.author!.displayAvatarURL() })
            .addField('Source', hyperlink('Jump!', message.url))
            .setColor('GOLD')
            .setTimestamp();

        if (message.content) embed.setDescription(message.content.substring(0, 1024));
        if (message.attachments.first()) embed.setImage(message.attachments.first()?.url as string);

        const guild = this.client.servers.get(message.guild!.id);
        if (!guild) return;

        const channel = this.client.channels.cache.get(guild!.board) as TextChannel;
        if (!channel) return;
        
        const generate = () => EMOJI + ' ' + count + ' ' + channelMention(channel.id);
        const count = reaction.count;

        if (!guild.self && message.author!.id == user.id) return;
        if (!star && !guild.board || guild.limit > count) return;

        if (!star) {
            try {
                const msg = await channel.send({ content: generate(), embeds: [embed] });

                const doc = new StarModel({ 
                    id: message.id,
                    guild: message.guild?.id, 
                    channel: message.channel.id,
                    message: msg.id,
                    user: message.author?.id,
                    count: count
                });

                await doc.save();
                this.client.stars.set(message.id, doc);
            } catch (err) {
                console.error(err);
            }
        } else {
            let msg = channel.messages.cache.get(star.message) as Message;

            if (!msg) {
                try {
                    msg = await channel.messages.fetch(star.message) as Message;
                } catch (err) {
                    console.error(err);
                }
            }

            try {
                if (!msg) return;

                star.count = count;

                await StarModel.findOneAndUpdate({ 
                    id: message.id,
                    guild: message.guild?.id, 
                    channel: message.channel.id
                }, {
                    $set: star
                });

                await msg.edit({ content: generate(), embeds: [ embed ] });
            } catch (err) {
                console.error(err);
            }
        }
    }
}