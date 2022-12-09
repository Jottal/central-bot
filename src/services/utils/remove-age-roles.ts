import path from "path";
import clientUtils from "@services/utils/client-utils";
import identifiers from "@components/identifiers";
import { GuildMember } from "discord.js";

/**
 * Removes a user's age role based on their age.
 *
 * @param age - The user's age.
 * @param member - The ID of the user or Guild Member Object.
 */
const remove = async (age: number, member: string | GuildMember) => {
  switch (age) {
    case 13: {
      await clientUtils.removeRole(member, identifiers.central.roles.age13);
      break;
    }
    case 14: {
      await clientUtils.removeRole(member, identifiers.central.roles.age14);
      break;
    }
    case 15: {
      await clientUtils.removeRole(member, identifiers.central.roles.age15);
      break;
    }
    case 16: {
      await clientUtils.removeRole(member, identifiers.central.roles.age16);
      break;
    }
    case 17: {
      await clientUtils.removeRole(member, identifiers.central.roles.age17);
      break;
    }
    default: {
      await clientUtils.removeRole(member, identifiers.central.roles.age18);
      break;
    }
  }
};

type RemoveAgeRoles = Service & {
  remove: (age: number, member: string | GuildMember) => Promise<void>;
};

const removeAgeRoles: RemoveAgeRoles = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Service that removes the user's age role based on their age.",
  remove,
};

export default removeAgeRoles;
