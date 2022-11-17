import path from "path";
import { clientUtils } from "@services/utils/client-utils";
import { identifiers } from "@components/identifiers";

const send = async (age: number, memberId: string) => {
  await clientUtils.addRole(memberId, identifiers.central.roles.adventure);

  switch (age) {
    case 13: {
      await clientUtils.addRole(memberId, identifiers.central.roles.age13);
      break;
    }
    case 14: {
      await clientUtils.addRole(memberId, identifiers.central.roles.age14);
      break;
    }
    case 15: {
      await clientUtils.addRole(memberId, identifiers.central.roles.age15);
      break;
    }
    case 16: {
      await clientUtils.addRole(memberId, identifiers.central.roles.age16);
      break;
    }
    case 17: {
      await clientUtils.addRole(memberId, identifiers.central.roles.age17);
      break;
    }
    default: {
      await clientUtils.addRole(memberId, identifiers.central.roles.age18);
      break;
    }
  }
};

type SendOnboardingRoles = Service & {
  send: (age: number, memberId: string) => Promise<void>;
};

const sendOnboardingRoles: SendOnboardingRoles = {
  name: path.basename(__filename, path.extname(__filename)),
  description:
    "Serviço entrega as roles de aventureiro e idade para usuário conforme sua idade.",
  send,
};

export { sendOnboardingRoles };
