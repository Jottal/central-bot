import { ModalSubmitInteraction } from "discord.js";
import bcrypt from "bcrypt";
import { commandsList } from "@services/setup/fetch-commands";
import { StaffSchema } from "@models/Schemas/StaffSchema";

const execute = async (interaction: ModalSubmitInteraction, args: string[]) => {
  const passwordField = interaction.components[0] as any;
  const passwordVal = passwordField.components[0].value;

  const staff = await StaffSchema.findOne({
    idDiscord: interaction.member.user.id,
  }).exec();

  if (!staff) {
    await interaction.reply({
      content: "Você não está registrado na equipe!",
      ephemeral: true,
    });
    return;
  }

  const validatePass = await bcrypt.compare(passwordVal, staff.password);

  if (validatePass) {
    await interaction.deferUpdate();
    const command = commandsList.find((c) => c.name === args[0]);
    await command.execute(interaction);
  }
};

const modal: ModalSubmit = {
  name: "staff-password-modal-submit",
  description: "Modal that ends staff passwords modal.",
  execute,
};

export { modal };
