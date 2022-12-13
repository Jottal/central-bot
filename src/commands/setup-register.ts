import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
  TextChannel,
} from "discord.js";
import logError from "@services/utils/log-error";
import { client } from "@services/setup/connection-discord";
import identifiers from "@components/identifiers";

const execute = async (
  interaction: ChatInputCommandInteraction | ModalSubmitInteraction
) => {
  const tempChannel = client.channels.cache.get(
    identifiers.central.channels.register
  ) as TextChannel;

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("register-button")
      .setLabel("Registrar!")
      .setStyle(ButtonStyle.Primary)
  );

  try {
    await tempChannel.send({
      content: `
**Taverna Central**

***Seja bem vindo ao nosso servidor:***

> Temos um espaço aconchegante e com muito RPG, mas para ter acesso à ele é muito importante que leia nossas #📌・regras  e realize nosso registro
> 
> Para realizar o registro basta clicar no botão azul logo abaixo:
`,
      components: [row],
    });

    await interaction.deferReply();
  } catch (error) {
    logError.log(error);
  }
};

const command: Command = {
  name: "setup-register",
  description: "Command that setup the message to register.",
  permissions: [
    identifiers.central.roles.owner,
    identifiers.central.roles.manager,
  ],
  needRegister: true,
  isStaffCommand: true,
  execute,
};

export { command };
