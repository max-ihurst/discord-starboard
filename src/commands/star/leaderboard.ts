import { Client, CommandInteraction, MessageEmbed } from 'discord.js';
import { bold, underscore } from '@discordjs/builders';
import * as ordinal from 'ordinal';
import Command from '../../Command';

interface User {
    username: string;
    count: number;
}

export default class StarLeaderboardCommand implements Command {
	public client: Client;
	public name = 'star-leaderboard';

	public constructor(client: Client) {
		this.client = client;
	}

	public async execute(interaction: CommandInteraction): Promise<void> {
        const stars = this.client.stars.filter(s => s.guild == interaction.guild?.id);
        const members = (await interaction.guild?.members.fetch())?.filter(m => !m.user.bot)
        let leaderboard: User[] = [];

        if (!members || !stars.size) {
            interaction.reply({ content: 'There are no starred messages in this guild!', ephemeral: true });
            return;
        }

        for (const member of Array.from(members.values())) {
            const s = stars.filter(s => s.user == member.id);
            const count = s.reduce((accumulator, object) => 
                accumulator + object.count, 0);
            leaderboard.push({ username: member.user.username, count });
        }

        leaderboard = leaderboard.sort((a, b) => b.count - a.count).splice(0, 10);
        const postion = leaderboard.findIndex((u) => u.username == interaction.member?.user.username) + 1;

        interaction.reply({
            embeds: [ new MessageEmbed()
                .setColor(0x2f3136)
                .setTitle(bold(underscore('Leaderboard')))
                .setDescription([
                    leaderboard.map((u, i) => `${bold(`${i + 1}`)} ${u.username}  (${u.count})`).join('\n'),
                    postion > 0 ? 'You are - ' + bold(postion + ordinal.indicator(postion)) : null
                ].join('\n'))
            ],
            ephemeral: true
        })

	}
}