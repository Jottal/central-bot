import path from "path";
import { SlashCommandBuilder } from "discord.js";

// TODO: Add more properties to the Command interface.

/**
 * Converts a `Command` object to a `SlashCommand` object.
 *
 * @param command - The `Command` object to convert.
 * @returns A new `SlashCommand` object created from the given `Command` object.
 */
const convert = (command: Command) =>
  new SlashCommandBuilder()
    .setName(command.name)
    .setDescription(command.description);

type ConvertCommandToSlash = Service & {
  convert: (command: Command) => SlashCommandBuilder;
};

const convertCommandToSlash: ConvertCommandToSlash = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Converts a command to a slash command.",
  convert,
};

export default convertCommandToSlash;
