import { ChatInputCommandInteraction, Events } from "discord.js";
import { commandsList } from "@services/setup/fetch-commands";
import logError from "@services/utils/log-error";
import verifyCommand from "@services/utils/verify-command";

// TODO: Implement permission system.

const execute = async (interaction: ChatInputCommandInteraction) => {
  if (!interaction.isCommand()) return;

  const command = commandsList.find((c) => c.name === interaction.commandName);
  if (!command) return;

  try {
    const isValid = await verifyCommand.verify(command, interaction);

    if (isValid.valid === false && isValid.message) {
      await interaction.reply({
        content: isValid.message,
        ephemeral: true,
      });
      return;
    } else if (isValid.valid === false) {
      return;
    }

    await command.execute(interaction);
  } catch (error) {
    await logError.log(error);
  }
};

const event: Event = {
  name: Events.InteractionCreate,
  description:
    "An event called when a command interaction with the bot is created.",
  once: false,
  execute,
};

export { event };
