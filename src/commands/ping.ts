import { ChatInputCommandInteraction } from "discord.js";
import { EmbedAlert } from "@models/EmbedAlert";
import logError from "@services/utils/log-error";

const execute = async (interaction: ChatInputCommandInteraction) => {
  try {
    // Calculate the bot's ping
    const ping = interaction.client.ws.ping;

    // Create the embed alert
    const title = "Latência Taverna Central";
    const description = `Pong! A latência é de **${ping}ms**.`;
    const embedAlert = EmbedAlert(title, description);

    // Reply to the user with the embed alert
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
  description: "Command that shows the bot's ping.",
  execute,
};

export { command };
