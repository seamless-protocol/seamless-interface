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
    href: import.meta.env.VITE_STAKING_FEATURE
      ? RouterConfig.Routes.governance
      : "https://legacy.seamlessprotocol.com/governance", // todo: remove this
    current: false,
  },
];
