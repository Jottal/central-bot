import { Events, ModalSubmitInteraction } from "discord.js";
import { modalsList } from "@services/setup/fetch-modals-submit";
import { logError } from "@services/utils/log-error";

const execute = async (interaction: ModalSubmitInteraction) => {
  try {
    if (!interaction.isModalSubmit()) return;

    const modal = modalsList.find((c) => c.name === interaction.customId);

    if (modal) {
      modal.execute(interaction);
    }
  } catch (error: any) {
    await logError.log(error);
  }
};

const event: Event = {
  name: Events.InteractionCreate,
  description: "Evento chamado quando for enviado submit do modal.",
  once: false,
  execute,
};

export { event };
