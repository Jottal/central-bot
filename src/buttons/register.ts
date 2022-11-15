import {
  ActionRowBuilder,
  ButtonInteraction,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { logError } from "@services/utils/log-error";
import { MinorUserSchema } from "@models/Schemas/MinorUserSchema";

const execute = async (interaction: ButtonInteraction) => {
  try {
    const minorUser = await MinorUserSchema.findOne({
      idDiscord: interaction.user.id,
    }).exec();

    if (minorUser) {
      await interaction.reply({
        content: "Você banido por idade. Volte quando tiver 13 anos!",
        ephemeral: true,
      });
      return;
    }

    const modal = new ModalBuilder()
      .setCustomId("register-modal-submit")
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
    error.name = "Erro ao iniciar botão de registro";
    await logError.log(error.name);
  }
};

const button: Button = {
  name: "register-button",
  description: "Botão que abre um modal para registrar o usuário.",
  execute,
};

export { button };
