import { IS_DEV_MODE } from "../../../../globals";
import { RouterConfig } from "@router";

export const navbarConfig = [
  {
    name: "Lend / Borrow",
    href: RouterConfig.Routes.lendingAndBorrowing,
    isLifi: false,
    current: false,
  },
  {
    name: "Swap / Bridge",
    href: "",
    isLifi: true,
    current: false,
  },
  {
    name: "Governance",
    href: IS_DEV_MODE ? RouterConfig.Routes.governance : "https://legacy.seamlessprotocol.com/governance", // todo: remove this
    current: false,
  },
];
