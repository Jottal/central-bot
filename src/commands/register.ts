import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { logError } from "@services/utils/log-error";

const execute = async (interaction: ChatInputCommandInteraction) => {
  try {
    const modal = new ModalBuilder()
      .setCustomId("register-mig-modal-submit")
      .setTitle("Registrar");

    const birthdayInput = new TextInputBuilder()
      .setCustomId("birthday-input")
      .setLabel("Data de nascimento:")
      .setPlaceholder("11/05/2002")
      .setMinLength(10)
      .setMaxLength(10)
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const firstActionRow =
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        birthdayInput
      );

    modal.addComponents(firstActionRow);

    await interaction.showModal(modal);
  } catch (error: any) {
    error.name = "Erro ao iniciar comando ping";
    await logError.log(error.name);
  }
};

const command: Command = {
  name: "registrar",
  description: "Comando que registra manualmente usuário em nosso sistema.",
  execute,
};

export { command };
