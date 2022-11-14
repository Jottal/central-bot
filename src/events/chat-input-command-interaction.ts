import { ChatInputCommandInteraction, Events } from "discord.js";
import { logError } from "@services/utils/log-error";
import { commandsList } from "@services/setup/fetch-commands";

const execute = async (interaction: ChatInputCommandInteraction) => {
  try {
    const command = commandsList.find(
      (c) => c.name === interaction.commandName
    );

    if (command) {
      command.execute(interaction);
    }
  } catch (error: any) {
    await logError.log(error);
  }
};

const event: Event = {
  name: Events.InteractionCreate,
  description: "Evento chamado quando for criado uma interação com o bot.",
  once: false,
  execute,
};

export { event };
