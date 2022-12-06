declare type CronJob = {
  name: string;
  description: string;
  cronTime: string;
  start: () => Promise<void>;
  startSchedule: () => void;
};
