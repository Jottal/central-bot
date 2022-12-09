import { Events, GuildBan } from "discord.js";
import logError from "@services/utils/log-error";
import { UserSchema } from "@models/Schemas/UserSchema";

// TODO: remove user tabletops

const execute = async (ban: GuildBan) => {
  try {
    await UserSchema.deleteOne({ idDiscord: ban.user.id }).exec();
  } catch (error) {
    await logError.log(error);
  }
};

const event: Event = {
  name: Events.GuildBanAdd,
  description: "Event called when a user is banned.",
  once: false,
  execute,
};

export { event };
