import {
    Client,
    MessageReaction,
    TextChannel,
    MessageEmbed,
    Message,
    User,
} from 'discord.js';
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

        if (reaction.emoji.name != EMOJI || user.bot) return;
        const { message } = reaction;
        const star =
            this.client.stars.get(message.id) ||
            this.client.stars.cache.find((s) => s.message == message.id);

        const embed = new MessageEmbed()
            .addField('Source', hyperlink('Jump!', message.url))
            .setColor('GOLD')
            .setTimestamp()
            .setAuthor({
                name: message.author!.tag,
                iconURL: message.author!.displayAvatarURL(),
            });

        if (message.content)
            embed.setDescription(message.content.substring(0, 1024));
        if (message.attachments.first())
            embed.setImage(message.attachments.first()?.url as string);

        const guild = this.client.servers.get(message.guild!.id);
        const channel = this.client.channels.cache.get(
            guild!.board
        ) as TextChannel;

        if (!channel || !guild) return;
        if (!guild.self && message.author!.id == user.id) return;
        if (guild.limit > reaction.count) return;

        if (star) {
            let msg = channel.messages.cache.get(star.message) as Message;

            if (!msg) {
                try {
                    msg = (await channel.messages.fetch(
                        star.message
                    )) as Message;
                } catch (err) {
                    console.error(err);
                }
            }

            if (!msg) return;
            star.count += reaction.count;

            if (message.id == star.message) {
                try {
                    await StarModel.findOneAndUpdate(
                        {
                            message: message.id,
                        },
                        {
                            $set: star,
                        }
                    );

                    await msg.edit({
                        content: `${EMOJI} ${reaction.count} <#${channel.id}>`,
                        embeds: message.embeds,
                    });
                } catch (error) {
                    console.error(error);
                }
            } else {
                try {
                    await StarModel.findOneAndUpdate(
                        {
                            id: message.id,
                        },
                        {
                            $set: star,
                        }
                    );

                    await msg.edit({
                        content: `${EMOJI} ${reaction.count} <#${channel.id}>`,
                        embeds: [embed],
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        } else {
            try {
                const msg = await channel.send({
                    content: `${EMOJI} ${reaction.count} <#${channel.id}>`,
                    embeds: [embed],
                });

                const doc = new StarModel({
                    id: message.id,
                    guild: message.guild?.id,
                    channel: message.channel.id,
                    message: msg.id,
                    user: message.author?.id,
                    count: reaction.count,
                });

                await doc.save();
                this.client.stars.set(message.id, doc);
                await msg.react(EMOJI);
            } catch (err) {
                console.error(err);
            }
        }
    }
}
