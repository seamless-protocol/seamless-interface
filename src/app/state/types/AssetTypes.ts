import { Address } from "viem";

interface AdditionalData {
  vaultsFyiLink?: string;
  isGauntletOptimized?: boolean;
  faq?: React.ReactNode;
  useCoinGeckoPrice?: boolean;
  description?: string;
}

export interface AssetBase {
  name?: string;
  symbol?: string;
  address?: Address;
  logo?: string;
  decimals?: number;
  subTitle?: string;

  additionalData?: AdditionalData;
}

export interface Asset extends AssetBase {
  sTokenAddress?: Address;
  debtTokenAddress?: Address;
}

export interface SubStrategyData {
  address: Address;
  targetMultiple: {
    value: number;
    symbol: string;
  };
}

export interface Strategy extends AssetBase {
  diagram?: string;
  underlyingAsset: Asset;
  debtAsset: Asset;
  subStrategyData: SubStrategyData[];
}
