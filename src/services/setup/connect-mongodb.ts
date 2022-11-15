import path from "path";
import Mongoose, { ConnectOptions } from "mongoose";
import { logError } from "@services/utils/log-error";

const connect = async () => {
  try {
    const MONGO_DB_USER = process.env.MONGO_DB_USER;
    const MONGO_DB_PASS = process.env.MONGO_DB_PASS;
    const DATABASE =
      process.env.NODE_ENV === "dev"
        ? process.env.MONGO_DATABASE_DEV
        : process.env.MONGO_DATABASE_PROD;

    const MONGODB_URI = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASS}@central.fm82b.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;

    const options: ConnectOptions = {};

    await Mongoose.connect(`${MONGODB_URI}`, options);
    console.log("\x1b[44m%s\x1b[0m", "✔ Connectado ao MongoDB.");
  } catch (error: any) {
    await logError.log(error);
  }
};

type ConnectMongoDB = Service & {
  connect: () => Promise<void>;
};

const connectMongoDB: ConnectMongoDB = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Serviço que conecta a aplicação ao MongoDB pelo Mongoose.",
  connect,
};

export { connectMongoDB };
