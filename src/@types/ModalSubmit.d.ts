declare type ModalSubmit = {
  name: string;
  description: string;
  execute: (
    interaction: import("discord.js").ModalSubmitInteraction,
    argList?: string[]
  ) => Promise<void>;
};
