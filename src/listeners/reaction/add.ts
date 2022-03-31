import { Client, MessageReaction, TextChannel, MessageEmbed, Message } from 'discord.js';
import { hyperlink, channelMention } from '@discordjs/builders';
import StarModel from '../../models/Star';
import GuildsModel from '../../models/Guild';
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

        if (message.content) embed.setDescription(message.content);
        if (message.attachments.first) embed.setImage(message.attachments.first()?.url as string);

        const guild = await GuildsModel.findOne({ guild: message.guild?.id });
        if (!star && (!guild?.board || guild!.limit > reaction.count)) return;

        const channel = this.client.channels.cache.get(guild!.board) as TextChannel;
        if (!channel) return;
        
        if (!star) {
            try {
                const msg = await channel.send({ embeds: [embed],
                    content: EMOJI + ' ' + reaction.count + ' ' + channelMention(channel.id)
                });

                const doc = new StarModel({ 
                    guild: message.guild?.id, 
                    channel: message.channel.id,
                    primal: message.id,
                    message: msg.id,
                    user: message.author?.id,
                    count: reaction.count
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
                if (!msg) {
                    await StarModel.deleteOne({
                        guild: message.guild?.id, 
                        channel: message.channel.id, 
                        primal: message.id
                    });

                    this.client.stars.delete(message.id);

                    return;
                }

                star.count = reaction.count;

                await StarModel.findOneAndUpdate({ 
                    guild: message.guild?.id, 
                    channel: message.channel.id, 
                    primal: message.id
                }, {
                    $set: star
                });

                await msg.edit({ embeds: [ embed ],
                    content: EMOJI + ' ' + star.count + ' ' + channelMention(channel.id)
                });
            } catch (err) {
                console.error(err);
            }
        }
    }
}