import path from "path";
import { identifiers } from "@components/identifiers";
import { client } from "@services/setup/connection-discord";
import { logError } from "@services/utils/log-error";
import { Role } from "discord.js";

const getRole = async (id: string) => {
  try {
    const guild = client.guilds.cache.get(identifiers.central.id);
    const role = guild.roles.cache.get(id);

    return role;
  } catch (error: any) {
    await logError.log(error);
  }
};

const addRole = async (idMember: string, roleString: string) => {
  try {
    const guild = client.guilds.cache.get(identifiers.central.id);
    const member = guild.members.cache.get(idMember);
    const role = await getRole(roleString);

    await member.roles.add(role);
  } catch (error: any) {
    await logError.log(error);
  }
};

type ClientUtils = Service & {
  getRole: (id: string) => Promise<Role | null>;
  addRole: (idMember: string, roleString: string) => Promise<void>;
};

const clientUtils: ClientUtils = {
  name: path.basename(__filename, path.extname(__filename)),
  description:
    "Serviço que disponibiliza métodos getters e setters utilizando a API do Discord.",
  getRole,
  addRole,
};

export { clientUtils };
