import path from "path";
import { SlashCommandBuilder } from "discord.js";

const convert = (command: Command) =>
  new SlashCommandBuilder()
    .setName(command.name)
    .setDescription(command.description);

type ConvertCommandToSlash = Service & {
  convert: (command: Command) => SlashCommandBuilder;
};

const convertCommandToSlash: ConvertCommandToSlash = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Registra os erros do Bot nos canais de logs configurados.",
  convert,
};

export { convertCommandToSlash };
