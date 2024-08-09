import { Address } from "viem";
import { assetsConfig, strategiesConfig } from "./config";

export const getIsStrategy = (address?: Address) => {
  if (!address) return false;

  return !!strategiesConfig[address];
};

export const hasFaqByAddress = (address?: Address) => {
  if (!address) return false;

  return !!strategiesConfig[address]?.faq || !!assetsConfig[address]?.faq;
};
