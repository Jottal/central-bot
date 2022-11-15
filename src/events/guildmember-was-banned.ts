import { Events, GuildBan } from "discord.js";
import { logError } from "@services/utils/log-error";
import { UserSchema } from "@models/Schemas/UserSchema";

const execute = async (ban: GuildBan) => {
  try {
    // TODO: remover mesas do usuario
    await UserSchema.deleteOne({ idDiscord: ban.user.id }).exec();
  } catch (error: any) {
    await logError.log(error);
  }
};

const event: Event = {
  name: Events.GuildBanAdd,
  description: "Evento chamado quando um usuário for banido.",
  once: false,
  execute,
};

export { event };
