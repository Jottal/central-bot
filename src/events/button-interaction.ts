import { ButtonInteraction, Events } from "discord.js";
import { buttonsList } from "@services/setup/fetch-buttons";
import logError from "@services/utils/log-error";

const execute = async (interaction: ButtonInteraction) => {
  if (!interaction.isButton()) return;

  const button = buttonsList.find((c) => c.name === interaction.customId);
  if (!button) return;

  try {
    button.execute(interaction);
  } catch (error) {
    await logError.log(error);
  }
};

const event: Event = {
  name: Events.InteractionCreate,
  description: "An event called when a button is used.",
  once: false,
  execute,
};

export { event };
