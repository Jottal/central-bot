import identifiers from "@components/identifiers";
import { modalStaffPassword } from "@models/ModalStaffPassword";
import { UserSchema } from "@models/Schemas/UserSchema";
import { ChatInputCommandInteraction } from "discord.js";
import path from "path";

const verify = async (
  command: Command,
  interaction: ChatInputCommandInteraction
) => {
  if (!interaction.inCachedGuild()) return;

  if (!command.permissions) {
    const isAdventure = interaction.member.roles.cache.has(
      identifiers.central.roles.adventure
    );

    if (!isAdventure)
      return {
        valid: false,
        message:
          "Você não possui tag de aventureiro, favor faça o registro com `/registrar` !",
      };
  }

  if (command.permissions) {
    const hasPermission = command.permissions.some((permission) =>
      interaction.member.roles.cache.has(permission)
    );

    if (!hasPermission)
      return {
        valid: false,
        message: "Você não possui permissão para executar esse comando!",
      };
  }

  if (command.needRegister) {
    const user = await UserSchema.findOne({
      idDiscord: interaction.member.user.id,
      verified: true,
    }).exec();

    if (!user)
      return {
        valid: false,
        message: "Você não está verificado, utilize `/registrar` !",
      };
  }

  if (command.isStaffCommand) {
    const isStaff = interaction.member.roles.cache.has(
      identifiers.central.roles.staff
    );

    if (!isStaff) {
      return {
        valid: false,
        message: "Você precisa ser staff para executar esse comando!",
      };
    } else {
      await interaction.showModal(modalStaffPassword(command.name));

      return {
        valid: false,
      };
    }
  }

  return {
    valid: true,
  };
};

type VerifyResponse = {
  valid: boolean;
  message?: string;
};

// TODO: re-ver type de resposta
type VerifyCommand = Service & {
  verify: (command: Command, interaction: ChatInputCommandInteraction) => any;
};

const verifyCommand: VerifyCommand = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Service that verifies the command parameters.",
  verify,
};

export default verifyCommand;
