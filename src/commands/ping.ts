import { ChatInputCommandInteraction } from "discord.js";
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
    await logError.log(error);
  }
};

const command: Command = {
  name: "ping",
  description: "Comando que mostra o ping do bot.",
  execute,
};

export { command };
