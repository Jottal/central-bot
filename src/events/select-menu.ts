import { Events, SelectMenuInteraction } from "discord.js";
import { logError } from "@services/utils/log-error";
import { selectsList } from "@services/setup/fetch-selects";

const execute = async (interaction: SelectMenuInteraction) => {
  try {
    if (!interaction.isSelectMenu()) return;

    const select = selectsList.find((c) => c.name === interaction.customId);

    if (select) {
      select.execute(interaction);
    }
  } catch (error: any) {
    await logError.log(error);
  }
};

const event: Event = {
  name: Events.InteractionCreate,
  description:
    "Evento chamado quando for criado uma interação select com o bot.",
  once: false,
  execute,
};

export { event };
