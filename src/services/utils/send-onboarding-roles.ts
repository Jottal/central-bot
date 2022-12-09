import path from "path";
import clientUtils from "@services/utils/client-utils";
import identifiers from "@components/identifiers";
import { GuildMember } from "discord.js";

/**
 * Delivers the adventurer and age roles to a user based on their age.
 *
 * @param age - The user's age.
 * @param member - The ID of the user or Guild Member object.
 */
const send = async (age: number, member: string | GuildMember) => {
  await clientUtils.addRole(member, identifiers.central.roles.adventure);

  switch (age) {
    case 13: {
      await clientUtils.addRole(member, identifiers.central.roles.age13);
      break;
    }
    case 14: {
      await clientUtils.addRole(member, identifiers.central.roles.age14);
      break;
    }
    case 15: {
      await clientUtils.addRole(member, identifiers.central.roles.age15);
      break;
    }
    case 16: {
      await clientUtils.addRole(member, identifiers.central.roles.age16);
      break;
    }
    case 17: {
      await clientUtils.addRole(member, identifiers.central.roles.age17);
      break;
    }
    default: {
      await clientUtils.addRole(member, identifiers.central.roles.age18);
      break;
    }
  }
};

type SendOnboardingRoles = Service & {
  send: (age: number, memberId: string | GuildMember) => Promise<void>;
};

const sendOnboardingRoles: SendOnboardingRoles = {
  name: path.basename(__filename, path.extname(__filename)),
  description:
    "Service that delivers the adventurer and age roles to the user based on their age.",
  send,
};

export default sendOnboardingRoles;
