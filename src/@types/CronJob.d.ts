declare type CronJob = {
  name: string;
  description: string;
  start: () => Promise<void>;
};
