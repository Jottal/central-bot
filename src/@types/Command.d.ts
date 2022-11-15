declare type Command = {
  name: string;
  description: string;
  execute: (
    interaction: import("discord.js").ChatInputCommandInteraction,
    argList?: string[]
  ) => Promise<void>;
};
