declare type Button = {
  name: string;
  description: string;
  execute: (
    interaction: import("discord.js").ButtonInteraction,
    argList?: string[]
  ) => Promise<void>;
};
