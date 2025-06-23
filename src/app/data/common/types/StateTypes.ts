import { Address } from "viem";
import { LendMarketConfig, SubStrategyDataConfig } from "../../settings/configTypes";

export type TagType = "Long" | "Staking" | "Short" | "Vault" | "Leverage Token";

export interface AssetBase {
  address: Address;
  isStrategy: boolean;
  tags: TagType[];
  // todo add apy? and any other sortable/filterable data
}
export interface LendMarketState extends AssetBase { }
export interface StrategyState extends AssetBase {
  // todo replace it with fetched data
  underlyingAsset: LendMarketConfig;
  debtAsset: LendMarketConfig;
  subStrategyData?: SubStrategyDataConfig[];
  multiplier?: string;
}
