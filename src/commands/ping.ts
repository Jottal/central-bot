import {
  ChatInputCommandInteraction,
  PermissionsBitField,
  SlashCommandBuilder,
} from "discord.js";
import { EmbedAlert } from "@models/EmbedAlert";
import { logError } from "@services/utils/log-error";

const execute = async (interaction: ChatInputCommandInteraction) => {
  try {
    const title = "Latência Taverna Central";
    const description = `Pong! A latência é de **${interaction.client.ws.ping}ms**.`;
    const embedAlert = EmbedAlert(title, description);
    await interaction.reply({
      content: `${interaction.member}`,
      embeds: [embedAlert],
    });
  } catch (error: any) {
    error.name = "Erro ao iniciar comando ping";
    await logError.log(error);
  }
};

const slash = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Comando que mostra o ping do bot.")
  .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator);

const command: Command = {
  name: "ping",
  aliases: ["pong"],
  description: "Comando que mostra o ping do bot.",
  protections: new Map(),
  cooldowns: new Map(),
  slash,
  execute,
};

export { command };
