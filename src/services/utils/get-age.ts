import path from "path";

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
  description:
    "Serviço que converte a data de aniversário para a idade do usuário.",
  get,
};

export { getAge };
