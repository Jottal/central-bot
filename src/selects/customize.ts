import { identifiers } from "@components/identifiers";
import { clientUtils } from "@services/utils/client-utils";
import { SelectMenuInteraction } from "discord.js";

const execute = async (interaction: SelectMenuInteraction) => {
  if (!interaction.inCachedGuild()) {
    return;
  }

  const member = interaction.member;
  const selected = interaction.values[0];

  const customizeRoles = Object.values(identifiers.central.roles.customize);

  const rolesToRemove = member.roles.cache.filter((role) =>
    customizeRoles.includes(role.id)
  );

  await member.roles.remove(rolesToRemove);
  await clientUtils.addRole(member.user.id, selected);

  await interaction.reply({
    content: "Cor alterada com sucesso!",
    ephemeral: true,
  });
};

const select: SelectMenu = {
  name: "customize-select",
  description: "Select que troca as cores do perfil do usuário.",
  execute,
};

export { select };
