import path from "path";
import fs from "fs";
import {
  REST,
  RESTPostAPIApplicationCommandsJSONBody,
  Routes,
} from "discord.js";
import centralConfig from "@config/central-config";
import { logError } from "@services/utils/log-error";
import { convertCommandToSlash } from "@services/utils/convert-command-to-slash";

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

    const TOKEN =
      process.env.NODE_ENV === "dev"
        ? process.env.DEV_BOT_TOKEN
        : process.env.PROD_BOT_TOKEN;

    const config =
      process.env.NODE_ENV === "dev" ? centralConfig.dev : centralConfig.prod;

    const rest = new REST({ version: config.central.version }).setToken(TOKEN);
    const commands: RESTPostAPIApplicationCommandsJSONBody[] = commandsList.map(
      (c) => convertCommandToSlash.convert(c).toJSON()
    );
    await rest.put(
      Routes.applicationGuildCommands(
        config.central.clientId,
        config.central.guildId
      ),
      {
        body: commands,
      }
    );

    console.log(
      "\x1b[42m%s\x1b[0m",
      `✔ [${commandsList.length}] Todos os comandos foram buscados.`
    );
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
