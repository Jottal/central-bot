import { ButtonInteraction, Events } from "discord.js";
import { buttonsList } from "@services/setup/fetch-buttons";
import { logError } from "@services/utils/log-error";

const execute = async (interaction: ButtonInteraction) => {
  try {
    if (!interaction.isButton()) return;

    const button = buttonsList.find((c) => c.name === interaction.customId);

    if (button) {
      button.execute(interaction);
    }
  } catch (error: any) {
    await logError.log(error);
  }
};

const event: Event = {
  name: Events.InteractionCreate,
  description: "Evento chamado quando for usado um botão.",
  once: false,
  execute,
};

export { event };
