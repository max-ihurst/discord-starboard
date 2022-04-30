import { SlashCommandBuilder } from '@discordjs/builders';

export const StarCommand = new SlashCommandBuilder()
    .setName('star')
    .setDescription('Star commands.')
    .addSubcommand((command) =>
        command
            .setName('limit')
            .setDescription(
                'The amount of stars required for a post to get starred.'
            )
            .addNumberOption((option) =>
                option
                    .setName('limit')
                    .setDescription('The limit of stars.')
                    .setRequired(true)
            )
    )
    .addSubcommand((command) =>
        command
            .setName('self')
            .setDescription('Toggle whether to be able to star your own posts.')
            .addBooleanOption((option) =>
                option
                    .setName('toggle')
                    .setDescription('Star your own posts.')
                    .setRequired(true)
            )
    )
    .addSubcommand((command) =>
        command
            .setName('leaderboard')
            .setDescription('The leaderboard of the guild stars.')
    );
