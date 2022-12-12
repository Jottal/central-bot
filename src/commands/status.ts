import { ChatInputCommandInteraction } from "discord.js";
import { EmbedAlert } from "@models/EmbedAlert";
import logError from "@services/utils/log-error";
import identifiers from "@components/identifiers";
import { guild } from "@services/setup/connection-discord";
import { UserSchema } from "@models/Schemas/UserSchema";

const execute = async (
  interaction: ChatInputCommandInteraction | ModalSubmitInteraction
) => {
  try {
    if (!interaction.inCachedGuild()) return;

    // Check if the user has the staff role
    const hasRole = interaction.member.roles.cache.has(
      identifiers.central.roles.staff
    );
    if (!hasRole) {
      // Show an error message if the user does not have the staff role
      interaction.reply({
        content:
          "Você precisa ser um membro da equipe da Taverna Central para executar este comando.",
        ephemeral: true,
      });
      return;
    }

    // Get the user data from the database
    const users = await UserSchema.find({}, { multi: true }).exec();
    const verifiedUsers = await UserSchema.find(
      { verified: true },
      { multi: true }
    ).exec();
    const usersAgeAverage = await UserSchema.aggregate([
      {
        $group: {
          _id: null,
          avgAge: { $avg: "$lastAge" },
        },
      },
    ]).exec();

    // Create the embed alert
    const title = "Status da Taverna Central:";
    const description = `
    ${guild.name}:

    **Discord:** 
    > \`${guild.channels.cache.size}\` / 500 Canais
    > \`${guild.roles.cache.size}\` / 250 Cargos
    > \`${guild.memberCount}\` / 100.000 Usuários Totais

    **Base de dados:**
    > \`${users.length}\` / Usuários Registrados
    > \`${verifiedUsers.length}\` / Usuários Verificados
    > \`${Math.round(usersAgeAverage[0].avgAge)}\` / Média de idade dos usuários
    `;
    const embedAlert = EmbedAlert(title, description);

    // Reply to the user with the embed alert
    await interaction.reply({
      content: `${interaction.member}`,
      embeds: [embedAlert],
    });
  } catch (error) {
    await logError.log(error);
  }
};

const command: Command = {
  name: "status",
  description: "Command that shows the server's status.",
  permissions: [
    identifiers.central.roles.owner,
    identifiers.central.roles.manager,
    identifiers.central.roles.moderator,
    identifiers.central.roles.staff,
  ],
  needRegister: true,
  isStaffCommand: true,
  execute,
};

export { command };
