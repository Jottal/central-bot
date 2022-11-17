import { ChatInputCommandInteraction, Events } from "discord.js";
import { commandsList } from "@services/setup/fetch-commands";
import { logError } from "@services/utils/log-error";

const execute = async (interaction: ChatInputCommandInteraction) => {
  try {
    if (!interaction.isCommand()) return;

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
