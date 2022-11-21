import { ButtonInteraction } from "discord.js";
import { MinorUserSchema } from "@models/Schemas/MinorUserSchema";
import { logError } from "@services/utils/log-error";
import { modalRegister } from "@models/ModalRegister";
import { UserSchema } from "@models/Schemas/UserSchema";
import { clientUtils } from "@services/utils/client-utils";
import { identifiers } from "@components/identifiers";

const execute = async (interaction: ButtonInteraction) => {
  try {
    const minorUser = await MinorUserSchema.findOne({
      idDiscord: interaction.user.id,
    }).exec();

    if (minorUser) {
      await interaction.reply({
        content:
          "Você não tem a idade mínima pela diretriz do Discord. Volte quando tiver 13 anos!",
        ephemeral: true,
      });
      return;
    }

    const userVerified = await UserSchema.findOne({
      idDiscord: interaction.user.id,
    }).exec();

    if (userVerified && userVerified.verified) {
      await clientUtils.addRole(
        userVerified.idDiscord,
        identifiers.central.roles.adventure
      );

      await interaction.reply({
        content: "Você já está registrado!",
        ephemeral: true,
      });
      return;
    }

    await interaction.showModal(modalRegister());
  } catch (error: any) {
    await logError.log(error);
  }
};

const button: Button = {
  name: "register-button",
  description: "Botão que abre um modal para registrar o usuário.",
  execute,
};

export { button };
