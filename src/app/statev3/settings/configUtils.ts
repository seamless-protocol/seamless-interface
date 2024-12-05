import { Address } from "viem";
import { strategyConfig } from "./config";

export const getIsStrategy = (address?: Address) => {
  if (!address) return false;

  return !!strategyConfig[address];
};

