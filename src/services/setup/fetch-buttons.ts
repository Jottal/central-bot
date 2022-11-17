import path from "path";
import { fetchFiles } from "@services/utils/fetch-files";
import { logError } from "@services/utils/log-error";

const buttonsFolder = path.join(
  path.resolve(),
  process.env.NODE_ENV === "dev" ? "/src/buttons" : "/dist/buttons"
);

const buttonsList: Button[] = [];

const fetch = async () => {
  try {
    await Promise.all(
      fetchFiles.fetch(buttonsFolder).map(async (value) => {
        const { button } = await import(value);
        buttonsList.push(button);
      })
    );

    console.log(
      "\x1b[42m%s\x1b[0m",
      `✔ [${buttonsList.length}] Todos os botões foram buscados.`
    );
  } catch (error: any) {
    await logError.log(error);
  }
};

type FetchButtons = Service & {
  fetch: () => Promise<void>;
};

const fetchButtons: FetchButtons = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Serviço que busca todos os botões do bot.",
  fetch,
};

export { fetchButtons, buttonsList };
