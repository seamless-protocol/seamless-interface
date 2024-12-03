import { Address } from "viem";
import { strategyConfig } from "../../statev3/settings/config";

export const getIsStrategy = (address?: Address) => {
  if (!address) return false;

  return !!strategyConfig[address];
};

