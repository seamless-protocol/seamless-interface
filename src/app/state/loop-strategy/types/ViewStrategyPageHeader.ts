import { Address } from "viem";
import { ValueSymbolPair } from "../../../../shared";

export interface ViewStrategyPageHeader {
  targetMultiple: string;
  oraclePrice: ValueSymbolPair;
  apy: ValueSymbolPair;
  underlyingAsset: {
    name: string;
    symbol: string;
    address: Address;
    logo: string;
  };
}
