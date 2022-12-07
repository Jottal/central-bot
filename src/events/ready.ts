import {
  ActionRowBuilder,
  Client,
  EmbedBuilder,
  Events,
  SelectMenuBuilder,
  TextChannel,
} from "discord.js";
import { logError } from "@services/utils/log-error";
import { identifiers } from "@components/identifiers";

const execute = async (client: Client) => {
  try {
    console.log(
      "\x1b[44m%s\x1b[0m",
      `✔ Logado como: ${client.user!.tag}, para ${
        client.guilds.cache.size
      } servidores.`
    );

    // Temporary
    const tempChannel = client.channels.cache.get(
      identifiers.central.channels.logs
    ) as TextChannel;

    const row = new ActionRowBuilder<SelectMenuBuilder>().addComponents(
      new SelectMenuBuilder()
        .setCustomId("customize-select")
        .setPlaceholder("Selecione uma cor para seu perfil:")
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions([
          {
            label: "Vermelho",
            description: "Vermelho dos olhos de um dragão jaz em seus olhos.",
            value: "1049743003306164379",
            emoji: "🔴",
          },
          {
            label: "Amarelo",
            description: "A cor do sol aquece o seu coração.",
            value: "1049743041109438555",
            emoji: "🟡",
          },
          {
            label: "Azul",
            description: "O cintilar do azul do mar rema em suas ações.",
            value: "1044065564001312789",
            emoji: "🔵",
          },
          {
            label: "Preto",
            description: "Linhas escuras revelam linhas claras.",
            value: "1044065740870922340",
            emoji: "⚫",
          },
          {
            label: "Marrom",
            description: "Em terra marrom a plantação se aflora.",
            value: "1044065866972659742",
            emoji: "🟤",
          },
          {
            label: "Saphira",
            description: "A Saphira é um linear entre o saber e o esquecer.",
            value: "s",
            emoji: "🧿",
          },
          {
            label: "Ciano",
            description:
              "A dipolaridade de suas ações denota sua flexibilidade.",
            value: "c",
            emoji: "💎",
          },
          {
            label: "Darkred",
            description: "A cor do sangue que corre em suas veias.",
            value: "d",
            emoji: "🧱",
          },
          {
            label: "Verde",
            description: "A cor da esperança que renasce em seu coração.",
            value: "v",
            emoji: "🟢",
          },
          {
            label: "Laranja",
            description: "A imensidão do laranja é refletida em sua mente.",
            value: "l",
            emoji: "🟠",
          },
          {
            label: "Rosa",
            description:
              "Seus sentimentos são como o rosa, são puros e sinceros.",
            value: "r",
            emoji: "🌺",
          },
          {
            label: "Roxo",
            description: "Mistério oculto no caminho de suas decisões.",
            value: "o",
            emoji: "🟣",
          },
          {
            label: "Violeta",
            description:
              "A faceta da realidade se molda na entropia da violeta.",
            value: "vi",
            emoji: "🌸",
          },
          {
            label: "Prata",
            description:
              "Justiça e guerra são impuras perante ao pratear da noite.",
            value: "pa",
            emoji: "🔩",
          },
        ])
    );

    const exampleEmbed = new EmbedBuilder()
      .setColor("#feb412")
      .setTitle("Escolha sua cor de exibição no servidor!")
      .setDescription(
        "Escolha cliando no menu de seleção abaixo uma cor para aparecer no servidor, tanto na lista da direita quanto ao comentar algo no chat cor do seu nome será alterada."
      )
      .setImage(
        "https://media.discordapp.net/attachments/558408423943700512/1050006930489360465/Banner_Cor.png"
      );

    await tempChannel.send({ embeds: [exampleEmbed], components: [row] });
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
