import path from "path";
import { Client, GatewayIntentBits } from "discord.js";
import { logError } from "@services/utils/log-error";

const client = new Client({
  shardCount: 1,
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
  ],
});

const connect = async () => {
  try {
    const TOKEN =
      process.env.NODE_ENV === "dev"
        ? process.env.DEV_BOT_TOKEN
        : process.env.PROD_BOT_TOKEN;

    await client.login(TOKEN);
  } catch (err) {
    await logError.log(err);
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

export { client, connectDiscord };
