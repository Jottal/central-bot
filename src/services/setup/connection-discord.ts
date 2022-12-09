import path from "path";
import { Client, GatewayIntentBits, Partials } from "discord.js";
import logError from "@services/utils/log-error";
import identifiers from "@components/identifiers";

const client = new Client({
  partials: [Partials.GuildMember],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
  ],
});

let guild = null;

const connect = async () => {
  const TOKEN =
    process.env.NODE_ENV === "dev"
      ? process.env.DEV_BOT_TOKEN
      : process.env.PROD_BOT_TOKEN;

  try {
    await client.login(TOKEN);
    guild = client.guilds.cache.get(identifiers.central.id);
  } catch (error) {
    await logError.log(error);
  }
};

type ConnectDiscord = Service & {
  connect: () => Promise<void>;
};

const connectDiscord: ConnectDiscord = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Service that connects the application to Discord.",
  connect,
};

export { client, connectDiscord, guild };
