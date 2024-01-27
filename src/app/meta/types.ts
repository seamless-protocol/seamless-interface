import { Address } from "viem";

export interface StrategyConfig {
  name: string;
  address: Address;
  underlyingAsset: {
    name: string;
    symbol: string;
    address: Address;
    logo: string;
  };
}
