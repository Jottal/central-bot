import { ChatInputCommandInteraction } from "discord.js";
import { logError } from "@services/utils/log-error";
import { UserSchema } from "@models/Schemas/UserSchema";
import { modalRegister } from "@models/ModalRegister";

const execute = async (interaction: ChatInputCommandInteraction) => {
  try {
    const user = await UserSchema.findOne({
      idDiscord: interaction.user.id,
    }).exec();

    if (!user) {
      new UserSchema({
        idDiscord: interaction.user.id,
        verified: false,
      }).save();
    } else if (user.verified) {
      await interaction.reply({
        content: "Você já está verificado!",
        ephemeral: true,
      });
      return;
    }

    await interaction.showModal(modalRegister());
  } catch (error: any) {
    await logError.log(error);
  }
};

const command: Command = {
  name: "registrar",
  description: "Comando que registra manualmente usuário em nosso sistema.",
  execute,
};

export { command };
