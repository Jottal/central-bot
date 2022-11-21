import {
  ChatInputCommandInteraction,
  GuildMemberRoleManager,
} from "discord.js";
import { EmbedAlert } from "@models/EmbedAlert";
import { logError } from "@services/utils/log-error";
import { identifiers } from "@components/identifiers";
import { client } from "@services/setup/connection-discord";
import { UserSchema } from "@models/Schemas/UserSchema";

const execute = async (interaction: ChatInputCommandInteraction) => {
  try {
    const userRoles = interaction.member.roles as GuildMemberRoleManager;
    const hasRole = userRoles.cache.has(identifiers.central.roles.staff);

    if (!hasRole) {
      interaction.reply({
        content:
          "Você precisa ser um membro da equipe da Taverna Central para executar este comando.",
        ephemeral: true,
      });
      return;
    }

    const central = client.guilds.cache.get(identifiers.central.id);

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

    const title = "Status da Taverna Central:";
    const description = `
    ${central.name}:

    **Discord:** 
    > \`${central.channels.cache.size}\` / 500 Canais
    > \`${central.roles.cache.size}\` / 250 Cargos
    > \`${central.members.cache.size}\` / 100.000 Usuários Totais

    **Base de dados:**
    > \`${users.length}\` / Usuários Registrados
    > \`${verifiedUsers.length}\` / Usuários Verificados
    > \`${Math.round(usersAgeAverage[0].avgAge)}\` / Média de idade dos usuários
    `;
    const embedAlert = EmbedAlert(title, description);

    await interaction.reply({
      content: `${interaction.member}`,
      embeds: [embedAlert],
    });
  } catch (error: any) {
    await logError.log(error);
  }
};

const command: Command = {
  name: "status",
  description: "Comando que mostra os status do servidor.",
  execute,
};

export { command };
