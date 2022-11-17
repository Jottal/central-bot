import cron from "node-cron";
import { MinorUserSchema } from "@models/Schemas/MinorUserSchema";
import { UserSchema } from "@models/Schemas/UserSchema";
import { getAge } from "@services/utils/get-age";
import { sendOnboardingRoles } from "@services/utils/send-onboarding-roles";
import { removeAgeRoles } from "@services/utils/remove-age-roles";

const reviewAge = async () => {
  const users = await UserSchema.find(
    { verified: true, birthday: { $ne: null }, lastAge: { $ne: null } },
    { multi: true }
  ).exec();
  const minorUsers = await MinorUserSchema.find({}, { multi: true }).exec();

  const usersToUpdate = users.filter((user) => {
    const age = getAge.get(user.birthday);

    if (user.lastAge !== age) return user;
  });
  const minorUsersToUpdate = minorUsers.filter((minorUser) => {
    const age = getAge.get(minorUser.birthday);

    if (minorUser.lastAge !== age) return minorUser;
  });

  await MinorUserSchema.updateMany(
    { _id: { $in: minorUsersToUpdate.map((minorUser) => minorUser._id) } },
    { $set: { $inc: { lastAge: 1 } }, multi: true }
  ).exec();

  await MinorUserSchema.deleteMany({ lastAge: 13 }, { multi: true }).exec();

  // Update users
  // If have more player implement a timeout to avoid rate limit
  await UserSchema.updateMany(
    { _id: { $in: usersToUpdate.map((user) => user._id) } },
    { $set: { $inc: { lastAge: 1 } } }
  ).exec();

  users.forEach(async (user) => {
    await removeAgeRoles.remove(user.lastAge, user.idDiscord);
    await sendOnboardingRoles.send(getAge.get(user.birthday), user.id);
  });
};

const start = () =>
  cron.schedule("*/1 * * * *", reviewAge, { scheduled: false });

const cronJob: CronJob = {
  name: "Verifica idade",
  description: "Serviço que verifica a idade dos usuários",
  start,
};

export { cronJob };
