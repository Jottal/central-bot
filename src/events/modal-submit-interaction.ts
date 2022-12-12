import { Events, ModalSubmitInteraction } from "discord.js";
import { modalsList } from "@services/setup/fetch-modals-submit";
import logError from "@services/utils/log-error";

const execute = async (interaction: ModalSubmitInteraction) => {
  try {
    if (!interaction.isModalSubmit()) return;

    const customId = interaction.customId.split("/");
    const modal = modalsList.find((c) => c.name === customId[0]);

    if (modal) {
      modal.execute(interaction, [customId[1]]);
    }
  } catch (error) {
    await logError.log(error);
  }
};

const event: Event = {
  name: Events.InteractionCreate,
  description: "Event called when the modal's submit is sent.",
  once: false,
  execute,
};

export { event };
