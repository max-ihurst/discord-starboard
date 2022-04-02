import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Snowflake } from 'discord.js';
import 'dotenv/config';

import {
	PingCommand,
	StarboardCommand,
	StarCommand
} from './interactions/index';

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN!);

try {
	rest.put(
		Routes.applicationCommands(
			process.env.CLIENT_ID as Snowflake
		),
		{
			body: [
				PingCommand,
				StarboardCommand,
				StarCommand
			]
		}
	);

	console.log('Successfully reloaded interaction (/) commands.');
} catch (e) {
	console.log(e);
}