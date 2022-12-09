import { GuildMember, ModalSubmitInteraction } from "discord.js";
import logError from "@services/utils/log-error";
import validateDate from "@services/utils/validate-date";
import { MinorUserSchema } from "@models/Schemas/MinorUserSchema";
import clientUtils from "@services/utils/client-utils";
import identifiers from "@components/identifiers";
import { UserSchema } from "@models/Schemas/UserSchema";
import getAge from "@services/utils/get-age";
import sendOnboardingRoles from "@services/utils/send-onboarding-roles";

const execute = async (interaction: ModalSubmitInteraction) => {
  try {
    const birthdayField = interaction.components[0] as any;
    const birthdayVal = birthdayField.components[0].value;

    // Validate the date
    const validDate = validateDate.validate(birthdayVal);
    if (!validDate) {
      await interaction.reply({
        content:
          "Data inválida, tente novamente com uma data no formato: dd/mm/YYYY",
        ephemeral: true,
      });
      return;
    }

    // Calculate the user's age
    const age = getAge.get(validDate);

    // Check if the user is a minor
    if (age < 13) {
      await new MinorUserSchema({
        idDiscord: interaction.user.id,
        birthday: validDate,
      }).save();

      clientUtils.removeRole(
        interaction.member as GuildMember,
        identifiers.central.roles.adventure
      );

      await interaction.reply({
        content:
          "Você não tem mais que 13 anos de idade e não podemos pela política do discord permitir sua entrada no servidor!",
        ephemeral: true,
      });
      return;
    }

    // Update the user's profile
    await UserSchema.updateOne(
      { idDiscord: interaction.user.id },
      { verified: true, birthday: validDate }
    ).exec();

    // Send onboarding roles
    await sendOnboardingRoles.send(age, interaction.user.id);

    // Reply to the user
    await interaction.reply({
      content: "Tudo certo, seja bem vindo à Taverna Central!",
      ephemeral: true,
    });
  } catch (error) {
    await logError.log(error);
  }
};

const modal: ModalSubmit = {
  name: "register-modal-submit",
  description: "Modal that ends registration modal.",
  execute,
};

export { modal };
