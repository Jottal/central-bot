import { Events, GuildMember } from "discord.js";
import { logError } from "@services/utils/log-error";
import { UserSchema } from "@models/Schemas/UserSchema";

const execute = async (member: GuildMember) => {
  try {
    await new UserSchema({
      idDiscord: member.user.id,
      verified: false,
    }).save();
  } catch (error: any) {
    await logError.log(error);
  }
};

const event: Event = {
  name: Events.GuildMemberAdd,
  description: "Evento chamado quando um usuário entrar no servidor.",
  once: false,
  execute,
};

export { event };
