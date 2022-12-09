import path from "path";
import { GuildMember, Role } from "discord.js";
import { guild } from "@services/setup/connection-discord";
import logError from "@services/utils/log-error";

// TODO: changing to some servers.

/**
 * Gets one or more roles from a Discord guild.
 *
 * @param ids - The ID or IDs of the role or roles to get. Can be a single string or an array of strings.
 *
 * @returns {Role[]} An array of the roles that were found.
 *
 * @throws {Error} If an error occurs while getting the roles.
 */
const getRoles = async (
  ids: string | string[] | Role | Role[]
): Promise<Role | Role[]> => {
  if (!Array.isArray(ids)) {
    const role = guild.roles.cache.get(ids);
    if (role) return role;
  } else {
    return ids
      .map((id: string | Role) => guild.roles.cache.get(id))
      .filter((role) => role !== undefined);
  }

  try {
    throw new Error("No roles found with the given IDs.");
  } catch (error) {
    await logError.log(error);
  }
};

/**
 * Adds a role to a guild member.
 *
 * @param member - The guild member to add the role to. Can be a string representing the member's ID, or a GuildMember object.
 * @param role - The role to add to the member. Can be a string representing the role's name or ID, or a Role object.
 *
 * @throws {Error} If `member` is not a string or GuildMember, or if `role` is not a string or Role.
 */
const addRole = async (member: string | GuildMember, role: string | Role) => {
  let guildMember: GuildMember = await verifyGuildMemberType(member);
  let guildRole: Role = await verifyRoleType(role);

  try {
    await guildMember.roles.add(guildRole);
  } catch (error) {
    await logError.log(error);
  }
};

/**
 * Removes a role to a guild member.
 *
 * @param member - The guild member to remove the role to. Can be a string representing the member's ID, or a GuildMember object.
 * @param role - The role to remove to the member. Can be a string representing the role's name or ID, or a Role object.
 *
 * @throws {Error} If `member` is not a string or GuildMember, or if `role` is not a string or Role.
 */
const removeRole = async (
  member: string | GuildMember,
  role: string | Role
) => {
  let guildMember: GuildMember = await verifyGuildMemberType(member);
  let guildRole: Role = await verifyRoleType(role);

  try {
    await guildMember.roles.remove(guildRole);
  } catch (error) {
    await logError.log(error);
  }
};

/**
 * Verifies the type of a guild member.
 *
 * @param member - The guild member to verify. Can be a string representing the member's ID, or a GuildMember object.
 *
 * @returns {GuildMember} The verified guild member.
 *
 * @throws {Error} If `member` is not a string or GuildMember.
 */
const verifyGuildMemberType = async (
  member: string | GuildMember
): Promise<GuildMember> => {
  if (member instanceof GuildMember) {
    return member;
  } else if (typeof member === "string") {
    return await guild.members.fetch(member);
  } else {
    throw new Error("Member must be a string or GuildMember.");
  }
};

/**
 * Verifies the type of a role.
 *
 * @param role - The role to verify. Can be a string representing the role's name or ID, or a Role object.
 *
 * @returns {Role} The verified role.
 *
 * @throws {Error} If `role` is not a string or Role.
 */
const verifyRoleType = async (role: string | Role): Promise<Role> => {
  if (role instanceof Role) {
    return role;
  } else if (typeof role === "string") {
    return (await getRoles(role)) as Role;
  } else {
    throw new Error("Role must be a string or Role.");
  }
};

type ClientUtils = Service & {
  getRoles: (ids: string | string[] | Role | Role[]) => Promise<Role | Role[]>;
  addRole: (member: string | GuildMember, role: string | Role) => Promise<void>;
  removeRole: (
    member: string | GuildMember,
    role: string | Role
  ) => Promise<void>;
};

const clientUtils: ClientUtils = {
  name: path.basename(__filename, path.extname(__filename)),
  description:
    "Service that provides getter and setter methods using the Discord API.",
  getRoles,
  addRole,
  removeRole,
};

export default clientUtils;
