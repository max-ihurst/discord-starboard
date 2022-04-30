import { SlashCommandBuilder } from '@discordjs/builders';
import { ChannelType } from 'discord-api-types/v9';

export const StarboardCommand = new SlashCommandBuilder()
    .setName('starboard')
    .setDescription('Set the channel for the starboard!')
    .addChannelOption((option) =>
        option
            .setName('channel')
            .setDescription('The channel to select.')
            .setRequired(true)
            .addChannelType(ChannelType.GuildText as number)
    );
