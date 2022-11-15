import { ModalSubmitInteraction } from "discord.js";
import { logError } from "@services/utils/log-error";
import { validateDate } from "@services/utils/validate-date";
import { MinorUserSchema } from "@models/Schemas/MinorUserSchema";

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

      await interaction.reply({
        content:
          "Você não mais que 13 anos e não podemos pela política do discord permitir sua entrada no servidor!",
        ephemeral: true,
      });
    } else if (age < 18) {
      // dar cargo aventureiro e -18
      await interaction.reply({
        content: "Tudo certo, bem vindo ao servidor!",
        ephemeral: true,
      });
    } else {
      // dar cargo aventureiro e +18
      await interaction.reply({
        content: "Tudo certo, bem vindo ao servidor!",
        ephemeral: true,
      });
    }
  } catch (error: any) {
    error.name = "Erro ao iniciar modal de registro";
    await logError.log(error);
  }
};

const modal: ModalSubmit = {
  name: "register-modal-submit",
  description: "Modal que finaliza Modal de Registro.",
  execute,
};

export { modal };
