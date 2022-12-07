declare type SelectMenu = {
  name: string;
  description: string;
  execute: (
    interaction: import("discord.js").SelectMenuInteraction,
    argList?: string[]
  ) => Promise<void>;
};
