import { Events, GuildMember } from "discord.js";
import { UserSchema } from "@models/Schemas/UserSchema";
import logError from "@services/utils/log-error";

const execute = async (member: GuildMember) => {
  try {
    const user = await UserSchema.findOne({ idDiscord: member.user.id }).exec();
    if (user) return;

    await new UserSchema({
      idDiscord: member.user.id,
      verified: false,
    }).save();
  } catch (error) {
    await logError.log(error);
  }
};

const event: Event = {
  name: Events.GuildMemberAdd,
  description: "An event called when a user enters the server.",
  once: false,
  execute,
};

export { event };
