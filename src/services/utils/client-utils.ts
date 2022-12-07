import path from "path";
import { Guild, Role } from "discord.js";
import { identifiers } from "@components/identifiers";
import { client } from "@services/setup/connection-discord";
import { logError } from "@services/utils/log-error";

/**
 * Get a single Role or an array of Roles.
 * @param  guild The Guilld the Role will be fetched.
 * @param  ids The string or string array containing discord's Roles ids.
 * @return A discord Role, array of Roles or undefined.
 */
const getRoles = async (guild: Guild, ids: string | string[]) => {
  try {
    if (!Array.isArray(ids)) {
      return guild.roles.cache.get(ids);
    }
    const resolved = await Promise.all(
      ids.map((id) => guild.roles.cache.get(id))
    );
    return resolved.filter((role) => role !== undefined) as Role[];
  } catch (error: any) {
    await logError.log(error);
  }
};

// TODO: In the future this function will be user in all servers.
const addRole = async (idMember: string, roleString: string) => {
  try {
    const guild = client.guilds.cache.get(identifiers.central.id);
    const member = await guild.members.fetch(idMember);
    const role = await getRoles(guild, roleString);

    await member.roles.add(role);
  } catch (error: any) {
    await logError.log(error);
  }
};

// TODO: In the future this function will be user in all servers.
const removeRole = async (idMember: string, roleString: string) => {
  try {
    const guild = client.guilds.cache.get(identifiers.central.id);
    const member = await guild.members.fetch(idMember);
    const role = await getRoles(guild, roleString);

    await member.roles.remove(role);
  } catch (error: any) {
    await logError.log(error);
  }
};

type ClientUtils = Service & {
  getRoles: (
    guild: Guild,
    ids: string | string[]
  ) => Promise<Role | Role[] | undefined>;
  addRole: (idMember: string, roleString: string) => Promise<void>;
  removeRole: (idMember: string, roleString: string) => Promise<void>;
};

const clientUtils: ClientUtils = {
  name: path.basename(__filename, path.extname(__filename)),
  description:
    "Serviço que disponibiliza métodos getters e setters utilizando a API do Discord.",
  getRoles,
  addRole,
  removeRole,
};

export { clientUtils };
