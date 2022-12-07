import path from "path";
import { fetchFiles } from "@services/utils/fetch-files";
import { logError } from "@services/utils/log-error";

const selectsFolder = path.join(
  path.resolve(),
  process.env.NODE_ENV === "dev" ? "/src/selects" : "/dist/selects"
);

const selectsList: SelectMenu[] = [];

const fetch = async () => {
  try {
    await Promise.all(
      fetchFiles.fetch(selectsFolder).map(async (value) => {
        const { select } = await import(value);
        selectsList.push(select);
      })
    );

    console.log(
      "\x1b[42m%s\x1b[0m",
      `✔ [${selectsList.length}] Todos os selects foram buscados.`
    );
  } catch (error: any) {
    await logError.log(error);
  }
};

type FetchSelects = Service & {
  fetch: () => Promise<void>;
};

const fetchSelects: FetchSelects = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Serviço que busca todos os selects do bot.",
  fetch,
};

export { fetchSelects, selectsList };
