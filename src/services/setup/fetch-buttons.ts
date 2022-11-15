import path from "path";
import fs from "fs";
import { logError } from "@services/utils/log-error";

const buttonsFolder = path.join(
  path.resolve(),
  process.env.NODE_ENV === "dev" ? "/src/buttons" : "/dist/buttons"
);

const buttonsList: Button[] = [];

const fetchFiles = (filePath: string, previousFiles?: string[]) => {
  const files = fs.readdirSync(filePath);
  let currentFiles: string[] = [];
  if (previousFiles) {
    currentFiles = previousFiles;
  }
  files.forEach((file) => {
    if (fs.statSync(`${filePath}/${file}`).isDirectory()) {
      currentFiles = fetchFiles(`${filePath}/${file}`, currentFiles);
    } else {
      currentFiles.push(path.join(filePath, "/", file));
    }
  });
  return currentFiles;
};

const fetch = async () => {
  try {
    await Promise.all(
      fetchFiles(buttonsFolder).map(async (value) => {
        const { button } = await import(value);
        buttonsList.push(button);
      })
    );

    console.log(
      "\x1b[42m%s\x1b[0m",
      `✔ [${buttonsList.length}] Todos os botões foram buscados.`
    );
  } catch (err) {
    await logError.log(err);
  }
};

type FetchButtons = Service & {
  fetch: () => Promise<void>;
};

const fetchButtons: FetchButtons = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Serviço que busca todos os botões do bot",
  fetch,
};

export { fetchButtons, buttonsList };
