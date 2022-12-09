import development from "../data/ids-dev.json";
import production from "../data/ids-prod.json";

const identifiers = {
  ...(process.env.NODE_ENV === "dev" ? development : production),
};

export default identifiers;
