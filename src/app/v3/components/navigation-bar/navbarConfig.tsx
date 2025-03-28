import { RouterConfig } from "../../../router";

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
    href: RouterConfig.Routes.governance,
    current: false,
  },
];
