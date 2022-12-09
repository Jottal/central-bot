import path from "path";
import fetchFiles from "@services/utils/fetch-files";
import logError from "@services/utils/log-error";

const cronFolder = path.join(
  path.resolve(),
  process.env.NODE_ENV === "dev" ? "/src/cron" : "/dist/cron"
);

const cronList: CronJob[] = [];

const fetch = async () => {
  try {
    const files = fetchFiles.fetch(cronFolder);
    const importedFiles = await Promise.all(
      files.map(async (value) => {
        return await import(value);
      })
    );

    importedFiles.forEach((file) => {
      cronList.push(file.cronJob);
    });

    cronList.forEach((cronJob) => {
      cronJob.startSchedule();
    });

    console.log(
      "\x1b[42m%s\x1b[0m",
      `✔ [${cronList.length}] All jobs have been started.`
    );
  } catch (error) {
    await logError.log(error);
  }
};

type FetchCronJobs = Service & {
  fetch: () => Promise<void>;
};

const fetchCronJobs: FetchCronJobs = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Service that starts the cron jobs.",
  fetch,
};

export { fetchCronJobs, cronList };
