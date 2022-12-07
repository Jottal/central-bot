import path from "path";
import { config } from "dotenv";
import { fetchCommands } from "@services/setup/fetch-commands";
import { registerEvents } from "@services/setup/register-events";
import { client, connectDiscord } from "@services/setup/connection-discord";
import { connectMongoDB } from "@services/setup/connect-mongodb";
import { fetchButtons } from "@services/setup/fetch-buttons";
import { fetchModals } from "@services/setup/fetch-modals-submit";
import { fetchCronJobs } from "@services/setup/start-cron-jobs";
import { fetchSelects } from "@services/setup/fetch-selects";

config({
  path: path.join(path.resolve(), ".env"),
});

const initialize = async () => {
  await fetchCronJobs.fetch();
  await fetchCommands.fetch();
  await fetchButtons.fetch();
  await fetchModals.fetch();
  await fetchSelects.fetch();
  await registerEvents.register(client);
  await connectMongoDB.connect();
  await connectDiscord.connect();
};

initialize();

export { initialize };
