import "dotenv/config";
import { Client, GatewayIntentBits, REST } from "discord.js";

const TOKEN = process.env.BOT_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: "10" }).setToken(TOKEN);
