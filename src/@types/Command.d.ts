declare type Command = {
  name: string;
  description: string;
  permissions?: string[];
  needRegister?: boolean;
  isStaffCommand?: boolean;
  execute: (
    interaction:
      | import("discord.js").ChatInputCommandInteraction
      | import("discord.js").ModalSubmitInteraction,
    argList?: string[]
  ) => Promise<void>;
};
