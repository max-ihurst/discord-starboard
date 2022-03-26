import Client from './client/Client';
import 'dotenv/config'

const client = new Client();
client.login(process.env.DISCORD_TOKEN!);