import path from "path";
import fs from "fs";
import { logError } from "@services/utils/log-error";

const cronFolder = path.join(
  path.resolve(),
  process.env.NODE_ENV === "dev" ? "/src/cron" : "/dist/cron"
);

const cronList: CronJob[] = [];

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
      fetchFiles(cronFolder).map(async (value) => {
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
  } catch (err) {
    await logError.log(err);
  }
};

type FetchCronJobs = Service & {
  fetch: () => Promise<void>;
};

const fetchCronJobs: FetchCronJobs = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Serviço que inicia os jobs.",
  fetch,
};

export { fetchCronJobs, cronList };
