import path from "path";
import { Client, GatewayIntentBits } from "discord.js";
import { logError } from "@services/utils/log-error";

const client = new Client({
  shardCount: 1,
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const connect = async () => {
  try {
    await client.login(process.env.BOT_TOKEN);
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
