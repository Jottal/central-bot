import path from "path";
import fs from "fs";
import {
  REST,
  RESTPostAPIApplicationCommandsJSONBody,
  Routes,
} from "discord.js";
import centralConfig from "@config/central-config";
import { logError } from "@services/utils/log-error";

const CLIENT_ID = centralConfig.central.clientId;
const GUILD_ID = centralConfig.central.guildId;

const commandsFolder = path.join(
  path.resolve(),
  process.env.NODE_ENV === "dev" ? "/src/commands" : "/dist/commands"
);

const commandsList: Command[] = [];

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

const fetch = async () => {
  try {
    await Promise.all(
      fetchFiles(commandsFolder).map(async (value) => {
        const { command } = await import(value);
        commandsList.push(command);
      })
    );

    const rest = new REST({ version: centralConfig.central.version }).setToken(
      process.env.BOT_TOKEN
    );
    const commands: RESTPostAPIApplicationCommandsJSONBody[] = commandsList.map(
      (c) => c.slash.toJSON()
    );
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });

    console.log("\x1b[42m%s\x1b[0m", "✔ Todos os comandos foram buscados.");
  } catch (err) {
    await logError.log(err);
  }
};

type FetchCommands = Service & {
  fetch: () => Promise<void>;
};

const fetchCommands: FetchCommands = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Service that fetches the commands from Discord.",
  fetch,
};

export { fetchCommands, commandsList };
