import path from "path";
import fetchFiles from "@services/utils/fetch-files";
import logError from "@services/utils/log-error";

const selectsFolder = path.join(
  path.resolve(),
  process.env.NODE_ENV === "dev" ? "/src/selects" : "/dist/selects"
);

const selectsList: SelectMenu[] = [];

const fetch = async () => {
  try {
    const files = fetchFiles.fetch(selectsFolder);
    const importedFiles = await Promise.all(
      files.map(async (value) => {
        return await import(value);
      })
    );

    importedFiles.forEach((file) => {
      selectsList.push(file.select);
    });

    console.log(
      "\x1b[42m%s\x1b[0m",
      `✔ [${selectsList.length}] All selects have been searched.`
    );
  } catch (error) {
    await logError.log(error);
  }
};

type FetchSelects = Service & {
  fetch: () => Promise<void>;
};

const fetchSelects: FetchSelects = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Service that searches for all bot selects.",
  fetch,
};

export { fetchSelects, selectsList };
