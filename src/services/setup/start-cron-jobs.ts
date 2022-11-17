import path from "path";
import { fetchFiles } from "@services/utils/fetch-files";
import { logError } from "@services/utils/log-error";

const cronFolder = path.join(
  path.resolve(),
  process.env.NODE_ENV === "dev" ? "/src/cron" : "/dist/cron"
);

const cronList: CronJob[] = [];

const fetch = async () => {
  try {
    await Promise.all(
      fetchFiles.fetch(cronFolder).map(async (value) => {
        const { cronJob } = await import(value);
        cronList.push(cronJob);
      })
    );

    cronList.forEach(async (cronJob) => {
      await cronJob.start();
    });

    console.log(
      "\x1b[42m%s\x1b[0m",
      `✔ [${cronList.length}] Todos os jobs foram iniciados.`
    );
  } catch (error: any) {
    await logError.log(error);
  }
};

type FetchCronJobs = Service & {
  fetch: () => Promise<void>;
};

const fetchCronJobs: FetchCronJobs = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Serviço que inicia os cron jobs.",
  fetch,
};

export { fetchCronJobs, cronList };
