import path from "path";
import { config } from "dotenv";
import { fetchCommands } from "@services/setup/fetch-commands";
import { registerEvents } from "@services/setup/register-events";
import { client, connectDiscord } from "@services/setup/connection-discord";

config({
  path: path.join(path.resolve(), ".env"),
});

const initialize = async () => {
  await fetchCommands.fetch();
  await registerEvents.register(client);
  await connectDiscord.connect();
  // await connectMongoDB.connect();
};

initialize();

export { initialize };
