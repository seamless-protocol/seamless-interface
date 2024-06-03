import { Address } from "viem";
import { AssetConfig, SubStrategyDataConfig } from "../../settings/configTypes";

export type TagType = "LEND" | "ILM";

export interface AssetBase {
  address: Address;
  isStrategy: boolean;
  tags: TagType[];
  // todo add apy? and any other sortable/filterable data
}
export interface AssetState extends AssetBase {
}
export interface StrategyState extends AssetBase {
  // todo replace it with fetched data
  underlyingAsset: AssetConfig;
  debtAsset: AssetConfig;
  subStrategyData: SubStrategyDataConfig[];
}