import path from "path";

/**
 * Validates whether a date is in the correct format.
 *
 * @param dateString - The date string to validate.
 * @returns The matched date string, or `null` if the date string is not valid.
 */
const validate = (dateString: string) => {
  const regex =
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  const match = regex.exec(dateString);
  return match ? match[0] : null;
};

type ValidateDate = Service & {
  validate: (dateString: string) => string;
};

const validateDate: ValidateDate = {
  name: path.basename(__filename, path.extname(__filename)),
  description:
    "Service that validates whether the date is in the correct format.",
  validate,
};

export default validateDate;
