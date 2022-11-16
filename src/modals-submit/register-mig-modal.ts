import { ModalSubmitInteraction } from "discord.js";
import { logError } from "@services/utils/log-error";
import { validateDate } from "@services/utils/validate-date";
import { MinorUserSchema } from "@models/Schemas/MinorUserSchema";
import { clientUtils } from "@services/utils/client-utils";
import { identifiers } from "@components/identifiers";
import { UserSchema } from "@models/Schemas/UserSchema";

const getAge = (birthday: string) => {
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

const execute = async (interaction: ModalSubmitInteraction) => {
  try {
    const birthday = interaction.components[0] as any;
    const birthdayVal = birthday.components[0].value;

    const validDate = validateDate.validate(birthdayVal);

    if (!validDate) {
      await interaction.reply({
        content:
          "Data inválida, tente novamente com uma data no formato: dd/mm/YYYY",
        ephemeral: true,
      });
      return;
    }

    const age = getAge(validDate);

    if (age < 13) {
      await new MinorUserSchema({
        idDiscord: interaction.user.id,
        birthday: validDate,
      }).save();

      await new UserSchema({
        idDiscord: interaction.user.id,
        verified: false,
      }).save();

      await clientUtils.removeRole(
        interaction.user.id,
        identifiers.central.roles.adventure
      );

      await interaction.reply({
        content:
          "Você não mais que 13 anos e não podemos pela política do discord permitir sua entrada no servidor!",
        ephemeral: true,
      });
    }

    const userExists = await UserSchema.findOne({
      idDiscord: interaction.user.id,
    }).exec();

    if (userExists) {
      await UserSchema.updateOne(
        { idDiscord: interaction.user.id },
        { verified: true, birthday: validDate, lastAge: age }
      ).exec();
    } else {
      await new UserSchema({
        idDiscord: interaction.user.id,
        birthday: validDate,
        verified: true,
        lastAge: age,
      }).save();
    }

    switch (age) {
      case 13: {
        await clientUtils.addRole(
          interaction.user.id,
          identifiers.central.roles.adventure
        );
        await clientUtils.addRole(
          interaction.user.id,
          identifiers.central.roles.age13
        );
        await interaction.reply({
          content: "Tudo certo, seja bem vindo à Taverna Central!",
          ephemeral: true,
        });
        break;
      }
      case 14: {
        await clientUtils.addRole(
          interaction.user.id,
          identifiers.central.roles.adventure
        );
        await clientUtils.addRole(
          interaction.user.id,
          identifiers.central.roles.age14
        );
        await interaction.reply({
          content: "Tudo certo, seja bem vindo à Taverna Central!",
          ephemeral: true,
        });
        break;
      }
      case 15: {
        await clientUtils.addRole(
          interaction.user.id,
          identifiers.central.roles.adventure
        );
        await clientUtils.addRole(
          interaction.user.id,
          identifiers.central.roles.age15
        );
        await interaction.reply({
          content: "Tudo certo, seja bem vindo à Taverna Central!",
          ephemeral: true,
        });
        break;
      }
      case 16: {
        await clientUtils.addRole(
          interaction.user.id,
          identifiers.central.roles.adventure
        );
        await clientUtils.addRole(
          interaction.user.id,
          identifiers.central.roles.age16
        );
        await interaction.reply({
          content: "Tudo certo, seja bem vindo à Taverna Central!",
          ephemeral: true,
        });
        break;
      }
      case 17: {
        await clientUtils.addRole(
          interaction.user.id,
          identifiers.central.roles.adventure
        );
        await clientUtils.addRole(
          interaction.user.id,
          identifiers.central.roles.age17
        );
        await interaction.reply({
          content: "Tudo certo, seja bem vindo à Taverna Central!",
          ephemeral: true,
        });
        break;
      }
      default: {
        await clientUtils.addRole(
          interaction.user.id,
          identifiers.central.roles.adventure
        );
        await clientUtils.addRole(
          interaction.user.id,
          identifiers.central.roles.age18
        );
        await interaction.reply({
          content: "Tudo certo, seja bem vindo à Taverna Central!",
          ephemeral: true,
        });
        break;
      }
    }
  } catch (error: any) {
    error.name = "Erro ao iniciar modal de registro";
    await logError.log(error);
  }
};

const modal: ModalSubmit = {
  name: "register-mig-modal-submit",
  description: "Modal que finaliza Modal de Registro manual.",
  execute,
};

export { modal };
