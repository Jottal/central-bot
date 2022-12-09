import cron from "node-cron";
import { MinorUserSchema } from "@models/Schemas/MinorUserSchema";
import { UserSchema } from "@models/Schemas/UserSchema";
import getAge from "@services/utils/get-age";
import sendOnboardingRoles from "@services/utils/send-onboarding-roles";
import removeAgeRoles from "@services/utils/remove-age-roles";
import identifiers from "@components/identifiers";
import { client, guild } from "@services/setup/connection-discord";
import { TextChannel } from "discord.js";
import logError from "@services/utils/log-error";

// TODO: Add name of Birthday users to the message

const start = async () => {
  try {
    const users = await UserSchema.find({
      verified: true,
      birthday: { $ne: null },
      lastAge: { $ne: null },
    }).exec();
    const minorUsers = await MinorUserSchema.find({}).exec();

    // Use array filter and map methods to get users and minor users to update
    const usersToUpdate = users.filter((user) => {
      const age = getAge.get(user.birthday);
      return user.lastAge !== age;
    });

    const minorUsersToUpdate = minorUsers.filter((minorUser) => {
      const age = getAge.get(minorUser.birthday);
      return minorUser.lastAge !== age;
    });

    // Use array forEach method to update users and remove their roles
    usersToUpdate.forEach(async (user) => {
      await UserSchema.updateOne(
        { _id: user._id },
        { $inc: { lastAge: 1 } }
      ).exec();
      const member = await guild.members.fetch(user.idDiscord);
      await removeAgeRoles.remove(user.lastAge, member);
      await sendOnboardingRoles.send(getAge.get(user.birthday), member);
    });

    // Use array forEach method to update minor users and delete them if necessary
    minorUsersToUpdate.forEach(async (minorUser) => {
      await MinorUserSchema.updateOne(
        { _id: minorUser._id },
        { $inc: { lastAge: 1 } }
      ).exec();
      if (minorUser.lastAge === 13) {
        await MinorUserSchema.deleteOne({ _id: minorUser._id }).exec();
      }
    });

    // Use array length property to get the number of updated users and minor users
    const logChannel = client.channels.cache.get(
      identifiers.central.channels.logs
    ) as TextChannel;
    await logChannel.send(
      `📅 ${usersToUpdate.length} usuários atualizados.
${minorUsersToUpdate.length} usuários menores atualizados.`
    );
  } catch (error) {
    logError.log(error);
  }
};

const startSchedule = () => {
  cron.schedule(cronJob.cronTime, cronJob.start);
};

const cronJob: CronJob = {
  name: "Review Age",
  description: "Service that checks the age of users.",
  cronTime: "0 12 * * *",
  start,
  startSchedule,
};

export { cronJob };
