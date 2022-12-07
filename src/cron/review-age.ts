import cron from "node-cron";
import { MinorUserSchema } from "@models/Schemas/MinorUserSchema";
import { UserSchema } from "@models/Schemas/UserSchema";
import { getAge } from "@services/utils/get-age";
import { sendOnboardingRoles } from "@services/utils/send-onboarding-roles";
import { removeAgeRoles } from "@services/utils/remove-age-roles";
import { identifiers } from "@components/identifiers";
import { client } from "@services/setup/connection-discord";
import { TextChannel } from "discord.js";

const start = async () => {
  const users = await UserSchema.find({
    verified: true,
    birthday: { $ne: null },
    lastAge: { $ne: null },
  }).exec();
  const minorUsers = await MinorUserSchema.find({}).exec();

  const usersToUpdate = users.filter((user) => {
    const age = getAge.get(user.birthday);

    if (user.lastAge !== age) return user;
  });

  const minorUsersToUpdate = minorUsers.filter((minorUser) => {
    const age = getAge.get(minorUser.birthday);

    if (minorUser.lastAge !== age) return minorUser;
  });

  if (usersToUpdate.length > 0) {
    const t = await UserSchema.updateMany(
      { _id: { $in: usersToUpdate.map((user) => user._id) } },
      { $inc: { lastAge: 1 } }
    ).exec();

    usersToUpdate.forEach(async (user) => {
      await removeAgeRoles.remove(user.lastAge, user.idDiscord);
      await sendOnboardingRoles.send(getAge.get(user.birthday), user.idDiscord);
    });
  }

  if (minorUsersToUpdate.length > 0) {
    await MinorUserSchema.updateMany(
      { _id: { $in: minorUsersToUpdate.map((minorUser) => minorUser._id) } },
      { $inc: { lastAge: 1 } }
    ).exec();

    await MinorUserSchema.deleteMany({ lastAge: 13 }).exec();
  }

  const logChannel = client.channels.cache.get(
    identifiers.central.channels.logs
  ) as TextChannel;
  await logChannel.send(
    `📅 ${usersToUpdate.length} usuários atualizados e ${minorUsersToUpdate.length} usuários menores atualizados.`
  );
};

const startSchedule = () => {
  cron.schedule(cronJob.cronTime, cronJob.start);
};

const cronJob: CronJob = {
  name: "Verifica idade",
  description: "Serviço que verifica a idade dos usuários",
  cronTime: "0 12 * * *",
  start,
  startSchedule,
};

export { cronJob };
