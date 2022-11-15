declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "dev" | "prod";
    DEV_BOT_TOKEN: string;
    PROD_BOT_TOKEN: string;
  }
}
