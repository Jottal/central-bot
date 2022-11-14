declare type Command = {
  name: string;
  aliases?: string[];
  description: string;
  delay?: number;
  protections: Map<string, number>;
  cooldowns: Map<string, number>;
  permissions?: import("discord.js").PermissionResolvable[];
  channels?: string[];
  roles?: string[];
  guildOnly?: boolean;
  args?: number;
  usage?: string;
  slash: import("discord.js").SlashCommandBuilder;
  execute: (
    interaction: import("discord.js").ChatInputCommandInteraction,
    argList?: string[]
  ) => Promise<void>;
};
