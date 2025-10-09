import { legacyGovUrl, RouterConfig } from "@router";

export const navbarConfig = [
  ...(import.meta.env.VITE_PORTFOLIO_FEATURE === "true" ? [{
    name: "Swap / Bridge",
    href: "",
    isLifi: true,
    current: false,
  }] : []),
  {
    name: "Governance",
    href: import.meta.env.VITE_STAKING_FEATURE === "true" ? RouterConfig.Routes.governance : legacyGovUrl, // todo: remove this
    current: false,
  },
];
