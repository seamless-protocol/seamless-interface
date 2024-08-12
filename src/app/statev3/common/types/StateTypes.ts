import { Address } from "viem";
import { LendMarketConfig } from "../../settings/configTypes";

export type TagType = "Staking" | "Long";

export interface StrategyState {
  address: Address;
  isStrategy: boolean;
  tags: TagType[];

  // todo replace it with fetched data
  underlyingAsset: LendMarketConfig;
  debtAsset: LendMarketConfig;
  multiplier?: string;
}
