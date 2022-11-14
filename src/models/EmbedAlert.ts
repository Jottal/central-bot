import { EmbedBuilder } from "discord.js";

const EmbedAlert = (title: string, description: string) => {
  const embed = new EmbedBuilder();
  embed.setColor(0xffff00);
  embed.setAuthor({
    name: title,
    iconURL:
      "https://media.discordapp.net/attachments/558408423943700512/1041772454579802244/Taverna-Cerveja.png?width=920&height=920",
  });
  embed.setDescription(`${description}`);
  return embed;
};

export { EmbedAlert };
