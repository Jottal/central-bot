import cron from "node-cron";
import { identifiers } from "@components/identifiers";
import {
  IMinorUserSchema,
  MinorUserSchema,
} from "@models/Schemas/MinorUserSchema";
import { IUserSchema, UserSchema } from "@models/Schemas/UserSchema";
import { clientUtils } from "@services/utils/client-utils";

const getAge = (birthday: string) => {
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

const reviewAge = async () => {
  const users: IUserSchema[] = await UserSchema.find(
    { birthday: { $ne: null }, lastAge: { $ne: null } },
    { multi: true }
  ).exec();
  const minorUsers: IMinorUserSchema[] = await MinorUserSchema.find(
    {},
    { multi: true }
  ).exec();

  const usersToUpdate = users.filter((user) => {
    const age = getAge(user.birthday);

    if (user.lastAge !== age) return user;
  });
  const minorUsersToUpdate = minorUsers.filter((minorUser) => {
    const age = getAge(minorUser.birthday);

    if (minorUser.lastAge !== age) return minorUser;
  });

  await MinorUserSchema.updateMany(
    { _id: { $in: minorUsersToUpdate.map((minorUser) => minorUser._id) } },
    { $set: { $inc: { lastAge: 1 } } }
  ).exec();

  // Update users
  // If have more player implement a timeout to avoid rate limit
  await UserSchema.updateMany(
    { _id: { $in: usersToUpdate.map((user) => user._id) } },
    { $set: { $inc: { lastAge: 1 } } }
  ).exec();

  users.forEach(async (user) => {
    switch (getAge(user.birthday)) {
      case 13: {
        await clientUtils.addRole(
          user.idDiscord,
          identifiers.central.roles.age13
        );
        break;
      }
      case 14: {
        await clientUtils.addRole(
          user.idDiscord,
          identifiers.central.roles.age14
        );
        break;
      }
      case 15: {
        await clientUtils.addRole(
          user.idDiscord,
          identifiers.central.roles.age15
        );
        break;
      }
      case 16: {
        await clientUtils.addRole(
          user.idDiscord,
          identifiers.central.roles.age16
        );
        break;
      }
      case 17: {
        await clientUtils.addRole(
          user.idDiscord,
          identifiers.central.roles.age17
        );
        break;
      }
      default: {
        await clientUtils.addRole(
          user.idDiscord,
          identifiers.central.roles.age18
        );
        break;
      }
    }
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
