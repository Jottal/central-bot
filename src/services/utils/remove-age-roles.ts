import path from "path";
import { clientUtils } from "@services/utils/client-utils";
import { identifiers } from "@components/identifiers";

const remove = async (age: number, memberId: string) => {
  switch (age) {
    case 13: {
      await clientUtils.removeRole(memberId, identifiers.central.roles.age13);
      break;
    }
    case 14: {
      await clientUtils.removeRole(memberId, identifiers.central.roles.age14);
      break;
    }
    case 15: {
      await clientUtils.removeRole(memberId, identifiers.central.roles.age15);
      break;
    }
    case 16: {
      await clientUtils.removeRole(memberId, identifiers.central.roles.age16);
      break;
    }
    case 17: {
      await clientUtils.removeRole(memberId, identifiers.central.roles.age17);
      break;
    }
    default: {
      await clientUtils.removeRole(memberId, identifiers.central.roles.age18);
      break;
    }
  }
};

type RemoveAgeRoles = Service & {
  remove: (age: number, memberId: string) => Promise<void>;
};

const removeAgeRoles: RemoveAgeRoles = {
  name: path.basename(__filename, path.extname(__filename)),
  description:
    "Serviço que remove o cargo de idade do usuário conforme sua idade.",
  remove,
};

export { removeAgeRoles };
