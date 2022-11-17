import path from "path";
import { Client, GatewayIntentBits, Partials } from "discord.js";
import { logError } from "@services/utils/log-error";

const client = new Client({
  partials: [Partials.GuildMember],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
  ],
});

const connect = async () => {
  try {
    const TOKEN =
      process.env.NODE_ENV === "dev"
        ? process.env.DEV_BOT_TOKEN
        : process.env.PROD_BOT_TOKEN;

    await client.login(TOKEN);
  } catch (error: any) {
    await logError.log(error);
  }
};

type ConnectDiscord = Service & {
  connect: () => Promise<void>;
};

const connectDiscord: ConnectDiscord = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Serviço que conecta a aplicação ao Discord.",
  connect,
};

export { client, connectDiscord };
