import path from "path";
import { fetchFiles } from "@services/utils/fetch-files";
import { logError } from "@services/utils/log-error";

const modalsFolder = path.join(
  path.resolve(),
  process.env.NODE_ENV === "dev" ? "/src/modals-submit" : "/dist/modals-submit"
);

const modalsList: ModalSubmit[] = [];

const fetch = async () => {
  try {
    await Promise.all(
      fetchFiles.fetch(modalsFolder).map(async (value) => {
        const { modal } = await import(value);
        modalsList.push(modal);
      })
    );

    console.log(
      "\x1b[42m%s\x1b[0m",
      `✔ [${modalsList.length}] Todos os modals foram buscados.`
    );
  } catch (error: any) {
    await logError.log(error);
  }
};

type FetchModals = Service & {
  fetch: () => Promise<void>;
};

const fetchModals: FetchModals = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Serviço que busca todos os modals do bot.",
  fetch,
};

export { fetchModals, modalsList };
