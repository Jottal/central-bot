import path from "path";
import { TextChannel } from "discord.js";
import { identifiers } from "@components/identifiers";
import { client } from "@services/setup/connection-discord";

const { central } = identifiers;

const log = async (error: any) => {
  try {
    console.log(`\x1b[41m%s\x1b[0m ${error}`, `✖ Erro inesperado: `);
    if (client.isReady()) {
      const logChannels = Object.values(central.channels.logs).map(
        (id) => client.channels.cache.get(id) as TextChannel
      );
      logChannels.map((channel) =>
        channel.send({ content: `⚠️ **Erro Inesperado** \`\`\`${error}\`\`\`` })
      );
    }
  } catch (err) {
    console.log(`\x1b[1m%s\x1b[0m ${err}`, `✖ Erro no log de erros: `);
  }
};

type LogError = Service & {
  log: (error: any) => Promise<void>;
};

const logError: LogError = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Registra os erros do Bot nos canais de logs configurados.",
  log,
};

export { logError };
