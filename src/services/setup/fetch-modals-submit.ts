import path from "path";
import fetchFiles from "@services/utils/fetch-files";
import logError from "@services/utils/log-error";

const modalsFolder = path.join(
  path.resolve(),
  process.env.NODE_ENV === "dev" ? "/src/modals-submit" : "/dist/modals-submit"
);

const modalsList: ModalSubmit[] = [];

const fetch = async () => {
  try {
    const files = fetchFiles.fetch(modalsFolder);
    const importedFiles = await Promise.all(
      files.map(async (value) => {
        return await import(value);
      })
    );

    importedFiles.forEach((file) => {
      modalsList.push(file.modal);
    });

    console.log(
      "\x1b[42m%s\x1b[0m",
      `✔ [${modalsList.length}] All modals have been searched.`
    );
  } catch (error) {
    await logError.log(error);
  }
};

type FetchModals = Service & {
  fetch: () => Promise<void>;
};

const fetchModals: FetchModals = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Service that searches for all bot modals.",
  fetch,
};

export { fetchModals, modalsList };
