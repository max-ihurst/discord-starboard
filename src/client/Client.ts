import { Client, Intents, Collection, BaseCommandInteraction } from 'discord.js';
import Command from '../Command';
import * as recursive from 'recursive-readdir';
import * as path from 'path'
import * as mongoose from 'mongoose';

export default class client extends Client {
    public commands: Collection<string, Command>

    public constructor() {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_MESSAGES,
            ]
        });

        this.once('ready', async () => {
            await mongoose.connect(process.env.MONGO_URI!)
            console.log('Yoo this is ready!')
        });

        this.on('interactionCreate', (interaction) => {
            if (!interaction.isCommand()) return;
        
            const { commandName } = interaction;
            const cmd = this.commands.get(commandName);

            if (cmd) {
                try {
                    cmd.execute(interaction as BaseCommandInteraction<'raw'>)
                } catch (e) {
                    interaction.reply('There was an error running this command!');
                    console.log(e);
                }
            }
        });

        this.commands = new Collection();

        this.load();
    }

    public async load(): Promise<void> {
        const files = await recursive('./src/commands');
        for (const file of files) {
            const cmd = ((await require(path.resolve(file))).default)
            const command = new cmd()
            command.client = this;
            this.commands.set(command.name, command);
        }
    }
}