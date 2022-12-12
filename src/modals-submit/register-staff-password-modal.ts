import { ModalSubmitInteraction } from "discord.js";
import bcrypt from "bcrypt";
import { StaffSchema } from "@models/Schemas/StaffSchema";

const execute = async (interaction: ModalSubmitInteraction) => {
  const passwordField = interaction.components[0] as any;
  const passwordVal = passwordField.components[0].value;

  const scriptPassword = await bcrypt.hash(passwordVal, 10);

  await new StaffSchema({
    idDiscord: interaction.member.user.id,
    name: interaction.member.user.username,
    password: scriptPassword,
  }).save();

  await interaction.reply({
    content: "Staff cadastrado com sucesso!",
    ephemeral: true,
  });
};

const modal: ModalSubmit = {
  name: "staff-register-password-modal-submit",
  description: "Modal that register staff passwords modal.",
  execute,
};

export { modal };
