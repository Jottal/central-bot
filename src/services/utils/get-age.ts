import path from "path";

/**
 * Returns the age of a user based on their birth date.
 *
 * @param dateString - The user's birth date in the format 'dd/mm/yyyy'.
 * @returns The user's age.
 */
const get = (dateString: string) => {
  const today = new Date();
  const dateSplit = dateString.split("/");
  const birthDate = new Date(
    Number(dateSplit[2]),
    Number(dateSplit[1]) - 1,
    Number(dateSplit[0])
  );

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

type GetAge = Service & {
  get: (dateString: string) => number;
};

const getAge: GetAge = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Service that converts the user's birthday to their age.",
  get,
};

export default getAge;
