import {
  ActionRowBuilder,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

const modalRegisterStaffPassword = () => {
  const modal = new ModalBuilder()
    .setCustomId(`staff-register-password-modal-submit`)
    .setTitle("Verificação Staff");

  const passwordInput = new TextInputBuilder()
    .setCustomId("password-input")
    .setLabel("Sua senha:")
    .setPlaceholder("LuccaLindo123")
    .setMinLength(8)
    .setRequired(true)
    .setStyle(TextInputStyle.Short);

  const firstActionRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
      passwordInput
    );

  modal.addComponents(firstActionRow);

  return modal;
};

export { modalRegisterStaffPassword };
