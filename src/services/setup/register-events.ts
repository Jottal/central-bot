import path from "path";
import { Client } from "discord.js";
import { fetchFiles } from "@services/utils/fetch-files";
import { logError } from "@services/utils/log-error";

const eventsFolder = path.join(
  path.resolve(),
  process.env.NODE_ENV === "dev" ? "/src/events" : "/dist/events"
);

const register = async (client: Client) => {
  try {
    const events = fetchFiles.fetch(eventsFolder);

    events.forEach(async (value) => {
      const event = (await require(`${value}`).event) as Event;
      if (event.once) {
        client.once(event.name, (...args: any[]) => event.execute(...args));
      } else {
        client.on(event.name, (...args: any[]) => event.execute(...args));
      }
    });

    console.log(
      "\x1b[42m%s\x1b[0m",
      `✔ [${events.length}] Todos os eventos foram registrados.`
    );
  } catch (error: any) {
    await logError.log(error);
  }
};

type RegisterEvents = Service & {
  register: (client: Client) => Promise<void>;
};

const registerEvents: RegisterEvents = {
  name: path.basename(__filename, path.extname(__filename)),
  description:
    "Serviço que registra todos os eventos configurados da API do Discord.",
  register,
};

export { registerEvents };
