import { ModalSubmitInteraction } from "discord.js";
import { logError } from "@services/utils/log-error";
import { validateDate } from "@services/utils/validate-date";
import { MinorUserSchema } from "@models/Schemas/MinorUserSchema";
import { clientUtils } from "@services/utils/client-utils";
import { identifiers } from "@components/identifiers";
import { UserSchema } from "@models/Schemas/UserSchema";
import { getAge } from "@services/utils/get-age";
import { sendOnboardingRoles } from "@services/utils/send-onboarding-roles";

const execute = async (interaction: ModalSubmitInteraction) => {
  try {
    // TODO: Study this code and refactor it.
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

    const age = getAge.get(validDate);

    if (age < 13) {
      await new MinorUserSchema({
        idDiscord: interaction.user.id,
        birthday: validDate,
      }).save();

      await interaction.reply({
        content:
          "Você não tem mais que 13 anos de idade e não podemos pela política do discord permitir sua entrada no servidor!",
        ephemeral: true,
      });
      return;
    }

    await UserSchema.updateOne(
      { idDiscord: interaction.user.id },
      { verified: true, birthday: validDate }
    ).exec();

    await sendOnboardingRoles.send(age, interaction.user.id);

    await interaction.reply({
      content: "Tudo certo, seja bem vindo à Taverna Central!",
      ephemeral: true,
    });
  } catch (error: any) {
    await logError.log(error);
  }
};

const modal: ModalSubmit = {
  name: "register-modal-submit",
  description: "Modal que finaliza Modal de Registro.",
  execute,
};

export { modal };
