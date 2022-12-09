import path from "path";
import { TextChannel } from "discord.js";
import identifiers from "@components/identifiers";
import { client } from "@services/setup/connection-discord";

const { central } = identifiers;

/**
 * Logs an error in the configured log channels.
 *
 * @param error - The error to log.
 */
const log = async (error: any) => {
  try {
    console.error(`\x1b[41m%s\x1b[0m ${error}`, `✖ Unexpected error: `);
    if (client.isReady()) {
      const logChannel = client.channels.cache.get(
        central.channels.logs
      ) as TextChannel;
      await logChannel.send(`⚠️ **Unexpected error** \`\`\`${error}\`\`\``);
    }
  } catch (err) {
    console.log(`\x1b[1m%s\x1b[0m ${err}`, `✖ Error while logging error: `);
  }
};

type LogError = Service & {
  log: (error: any) => Promise<void>;
};

const logError: LogError = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Records the Bot's errors in the configured log channels.",
  log,
};

export default logError;
