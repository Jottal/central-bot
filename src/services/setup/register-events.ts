import fs from "fs";
import path from "path";
import { Client } from "discord.js";
import { logError } from "@services/utils/log-error";

const eventsFolder = path.join(
  path.resolve(),
  process.env.NODE_ENV === "dev" ? "/src/events" : "/dist/events"
);

const fetchFiles = (filePath: string, previousFiles?: string[]) => {
  const files = fs.readdirSync(filePath);
  let currentFiles: string[] = [];
  if (previousFiles) {
    currentFiles = previousFiles;
  }
  files.forEach((file) => {
    if (fs.statSync(`${filePath}/${file}`).isDirectory()) {
      currentFiles = fetchFiles(`${filePath}/${file}`, currentFiles);
    } else {
      currentFiles.push(path.join(filePath, "/", file));
    }
  });
  return currentFiles;
};

const register = async (client: Client) => {
  try {
    fetchFiles(eventsFolder).forEach(async (value) => {
      const event = (await require(`${value}`).event) as Event;
      if (event.once) {
        client.once(event.name, (...args: any[]) => event.execute(...args));
      } else {
        client.on(event.name, (...args: any[]) => event.execute(...args));
      }
    });
    console.log("\x1b[42m%s\x1b[0m", "✔ Todos os eventos foram registrados.");
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
