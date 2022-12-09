import { Client, Events } from "discord.js";
import logError from "@services/utils/log-error";

const execute = async (client: Client) => {
  try {
    console.log(
      "\x1b[44m%s\x1b[0m",
      `✔ Logged in as: ${client.user!.tag}, for ${
        client.guilds.cache.size
      } servers.`
    );
  } catch (error) {
    await logError.log(error);
  }
};

const event: Event = {
  name: Events.ClientReady,
  description: "Event called once during bot initialization.",
  once: true,
  execute,
};

export { event };
