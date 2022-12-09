import path from "path";
import fetchFiles from "@services/utils/fetch-files";
import logError from "@services/utils/log-error";

const buttonsFolder = path.join(
  path.resolve(),
  process.env.NODE_ENV === "dev" ? "/src/buttons" : "/dist/buttons"
);

const buttonsList: Button[] = [];

const fetch = async () => {
  try {
    const files = fetchFiles.fetch(buttonsFolder);
    const importedFiles = await Promise.all(
      files.map(async (value) => {
        return await import(value);
      })
    );

    importedFiles.forEach((file) => {
      buttonsList.push(file.button);
    });

    console.log(
      "\x1b[42m%s\x1b[0m",
      `✔ [${buttonsList.length}] All buttons have been searched.`
    );
  } catch (error) {
    await logError.log(error);
  }
};

type FetchButtons = Service & {
  fetch: () => Promise<void>;
};

const fetchButtons: FetchButtons = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Service that searches for all bot buttons.",
  fetch,
};

export { fetchButtons, buttonsList };
