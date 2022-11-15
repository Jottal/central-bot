declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "dev" | "prod";
    DEV_BOT_TOKEN: string;
    PROD_BOT_TOKEN: string;
    MONGODB_URI_DEV: string;
    MONGODB_URI_PROD: string;
  }
}
