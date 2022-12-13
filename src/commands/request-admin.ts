import {
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
} from "discord.js";
import identifiers from "@components/identifiers";

// TODO: Create the execute function

const execute = async (
  interaction: ChatInputCommandInteraction | ModalSubmitInteraction
) => {};

const command: Command = {
  name: "request-admin",
  description: "Command that send a admin permission for the staff.",
  permissions: [
    identifiers.central.roles.owner,
    identifiers.central.roles.manager,
    identifiers.central.roles.moderator,
    identifiers.central.roles.staff,
  ],
  needRegister: true,
  isStaffCommand: true,
  execute,
};

export { command };
