import path from "path";
import fs from "fs";
import { logError } from "@services/utils/log-error";

const modalsFolder = path.join(
  path.resolve(),
  process.env.NODE_ENV === "dev" ? "/src/modals-submit" : "/dist/modals-submit"
);

const modalsList: ModalSubmit[] = [];

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
      fetchFiles(modalsFolder).map(async (value) => {
        const { modal } = await import(value);
        modalsList.push(modal);
      })
    );

    console.log(
      "\x1b[42m%s\x1b[0m",
      `✔ [${modalsList.length}] Todos os modals foram buscados.`
    );
  } catch (err) {
    await logError.log(err);
  }
};

type FetchModals = Service & {
  fetch: () => Promise<void>;
};

const fetchModals: FetchModals = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Serviço que busca todos os modals do bot",
  fetch,
};

export { fetchModals, modalsList };
