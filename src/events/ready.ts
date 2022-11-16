import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  Events,
  TextChannel,
} from "discord.js";
import { logError } from "@services/utils/log-error";
import { identifiers } from "@components/identifiers";

const execute = async (client: Client) => {
  try {
    // const registerChannel = client.channels.cache.get(
    //   identifiers.central.channels.register
    // ) as TextChannel;

    // const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    //   new ButtonBuilder()
    //     .setCustomId("register-button")
    //     .setLabel("Registrar")
    //     .setStyle(ButtonStyle.Primary)
    // );

    // await registerChannel.send({ content: "test", components: [row] });

    // ==================================================

    console.log(
      "\x1b[44m%s\x1b[0m",
      `✔ Logado como: ${client.user!.tag}, para ${
        client.guilds.cache.size
      } servidores.`
    );
  } catch (error: any) {
    await logError.log(error);
  }
};

const event: Event = {
  name: Events.ClientReady,
  description: "Evento chamado uma vez durante a inicialização do bot.",
  once: true,
  execute,
};

export { event };
