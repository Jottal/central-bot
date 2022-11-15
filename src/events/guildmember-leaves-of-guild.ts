import { Events, GuildMember } from "discord.js";
import { logError } from "@services/utils/log-error";
import { UserSchema } from "@models/Schemas/UserSchema";

const execute = async (member: GuildMember) => {
  try {
    await UserSchema.deleteOne({ idDiscord: member.user.id }).exec();
  } catch (error: any) {
    await logError.log(error);
  }
};

const event: Event = {
  name: Events.GuildMemberRemove,
  description: "Evento chamado quando um usuário sair do servidor.",
  once: false,
  execute,
};

export { event };
