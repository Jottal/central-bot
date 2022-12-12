import { ChatInputCommandInteraction } from "discord.js";
import logError from "@services/utils/log-error";
import { UserSchema } from "@models/Schemas/UserSchema";
import { modalRegister } from "@models/ModalRegister";
import identifiers from "@components/identifiers";

const execute = async (interaction: ChatInputCommandInteraction) => {
  try {
    // Check if the user is already registered
    const user = await UserSchema.findOne({
      idDiscord: interaction.user.id,
    }).exec();
    if (!user) {
      // Register the user if they are not already registered
      new UserSchema({
        idDiscord: interaction.user.id,
        verified: false,
      }).save();
    } else if (user.verified) {
      // Show an error message if the user is already verified
      await interaction.reply({
        content: "Você já está verificado!",
        ephemeral: true,
      });
      return;
    }

    // Show the user the registration modal
    await interaction.showModal(modalRegister());
  } catch (error) {
    await logError.log(error);
  }
};

const command: Command = {
  name: "registrar",
  description: "Command that manually registers a user in our system.",
  permissions: [identifiers.central.roles.adventure],
  execute,
};

export { command };
