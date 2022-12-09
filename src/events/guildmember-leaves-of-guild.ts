import { Events, GuildMember } from "discord.js";
import { UserSchema } from "@models/Schemas/UserSchema";
import logError from "@services/utils/log-error";

const execute = async (member: GuildMember) => {
  try {
    await UserSchema.deleteOne({ idDiscord: member.user.id }).exec();
  } catch (error) {
    await logError.log(error);
  }
};

const event: Event = {
  name: Events.GuildMemberRemove,
  description: "Event called when a user leaves the server.",
  once: false,
  execute,
};

export { event };
