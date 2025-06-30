import { legacyGovUrl, RouterConfig } from "@router";

export const navbarConfig = [
  {
    name: "Swap / Bridge",
    href: "",
    isLifi: true,
    current: false,
  },
  {
    name: "Governance",
    href: import.meta.env.VITE_STAKING_FEATURE === "true" ? RouterConfig.Routes.governance : legacyGovUrl, // todo: remove this
    current: false,
  },
];
