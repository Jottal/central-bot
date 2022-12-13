import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ModalSubmitInteraction,
  SelectMenuBuilder,
  TextChannel,
} from "discord.js";
import logError from "@services/utils/log-error";
import { client } from "@services/setup/connection-discord";
import identifiers from "@components/identifiers";

const execute = async (
  interaction: ChatInputCommandInteraction | ModalSubmitInteraction
) => {
  const tempChannel = client.channels.cache.get(
    identifiers.central.channels.customize
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
          value: identifiers.central.roles.customize.red,
          emoji: "🔴",
        },
        {
          label: "Amarelo",
          description: "A cor do sol aquece o seu coração.",
          value: identifiers.central.roles.customize.yellow,
          emoji: "🟡",
        },
        {
          label: "Azul",
          description: "O cintilar do azul do mar rema em suas ações.",
          value: identifiers.central.roles.customize.blue,
          emoji: "🔵",
        },
        {
          label: "Preto",
          description: "Linhas escuras revelam linhas claras.",
          value: identifiers.central.roles.customize.black,
          emoji: "⚫",
        },
        {
          label: "Marrom",
          description: "Em terra marrom a plantação se aflora.",
          value: identifiers.central.roles.customize.brown,
          emoji: "🟤",
        },
        {
          label: "Saphira",
          description: "A Saphira é um linear entre o saber e o esquecer.",
          value: identifiers.central.roles.customize.sapphire,
          emoji: "🧿",
        },
        {
          label: "Ciano",
          description: "A dipolaridade de suas ações denota sua flexibilidade.",
          value: identifiers.central.roles.customize.cyan,
          emoji: "💎",
        },
        {
          label: "Darkred",
          description: "A cor do sangue que corre em suas veias.",
          value: identifiers.central.roles.customize.darkRed,
          emoji: "🧱",
        },
        {
          label: "Verde",
          description: "A cor da esperança que renasce em seu coração.",
          value: identifiers.central.roles.customize.green,
          emoji: "🟢",
        },
        {
          label: "Laranja",
          description: "A imensidão do laranja é refletida em sua mente.",
          value: identifiers.central.roles.customize.orange,
          emoji: "🟠",
        },
        {
          label: "Rosa",
          description:
            "Seus sentimentos são como o rosa, são puros e sinceros.",
          value: identifiers.central.roles.customize.pink,
          emoji: "🌺",
        },
        {
          label: "Roxo",
          description: "Mistério oculto no caminho de suas decisões.",
          value: identifiers.central.roles.customize.purple,
          emoji: "🟣",
        },
        {
          label: "Violeta",
          description: "A faceta da realidade se molda na entropia da violeta.",
          value: identifiers.central.roles.customize.violet,
          emoji: "🌸",
        },
        {
          label: "Prata",
          description:
            "Justiça e guerra são impuras perante ao pratear da noite.",
          value: identifiers.central.roles.customize.silver,
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

  try {
    await tempChannel.send({ embeds: [exampleEmbed], components: [row] });

    await interaction.deferReply();
  } catch (error) {
    logError.log(error);
  }
};

const command: Command = {
  name: "setup-customize",
  description: "Command that setup the message to customize.",
  permissions: [
    identifiers.central.roles.owner,
    identifiers.central.roles.manager,
  ],
  needRegister: true,
  isStaffCommand: true,
  execute,
};

export { command };
