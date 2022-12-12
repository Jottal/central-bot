import { ChatInputCommandInteraction } from "discord.js";
import identifiers from "@components/identifiers";
import { modalRegisterStaffPassword } from "@models/ModalRegisterStaffPassword";

const execute = async (interaction: ChatInputCommandInteraction) => {
  await interaction.showModal(modalRegisterStaffPassword());
};

const command: Command = {
  name: "registrar-staff",
  description: "Command that create a password for the staff.",
  permissions: [
    identifiers.central.roles.owner,
    identifiers.central.roles.manager,
    identifiers.central.roles.moderator,
    identifiers.central.roles.staff,
  ],
  needRegister: true,
  execute,
};

export { command };
