import { Address } from "viem";
import type { TagType } from "../common/types/StateTypes";

export interface AssetBaseConfig {
  name?: string;
  symbol?: string;
  address: Address;
  logo?: string;
  subTitle?: string;
  description?: string;

  vaultsFyiLink?: string;
  isGauntletOptimized?: boolean;
  faq?: {
    question: JSX.Element;
    answer: JSX.Element;
  }[];
  useCoinGeckoPrice?: boolean;
  coingGeckoConfig?: {
    replaceAddress: Address;
  };
}

export interface LendMarketConfig extends AssetBaseConfig {
  // todo remove and fetch
  sTokenAddress?: Address;
  // todo remove and fetch
  debtTokenAddress?: Address;
}


export interface StrategyConfig extends AssetBaseConfig {
  diagram?: string;
  multiplier?: string;
  // todo remove and fetch
  underlyingAsset: LendMarketConfig;
  // todo remove and fetch
  debtAsset: LendMarketConfig;
  // todo remove and fetch
  tags?: TagType[]; // todo non optional
}
