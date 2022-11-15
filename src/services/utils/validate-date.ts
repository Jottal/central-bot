import path from "path";

const validate = (dateString: string) =>
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.exec(
    dateString
  )[0];

type ValidateDate = Service & {
  validate: (dateString: string) => string;
};

const validateDate: ValidateDate = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Valida se a data está no formato correto.",
  validate,
};

export { validateDate };
