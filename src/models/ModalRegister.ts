import {
  ActionRowBuilder,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

const modalRegister = () => {
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

  return modal;
};

export { modalRegister };
