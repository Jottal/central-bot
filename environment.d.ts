declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "dev" | "prod";
    BOT_TOKEN: string;
  }
}
