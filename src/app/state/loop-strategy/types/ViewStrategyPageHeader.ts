import { Address } from "viem";
import { ViewBigInt, ViewNumber } from "../../../../shared";

export interface ViewStrategyPageHeader {
  targetMultiple: ViewBigInt;
  oraclePrice: ViewBigInt;
  apy: ViewNumber;
  underlyingAsset: {
    name: string;
    symbol: string;
    address: Address;
    logo: string;
  };
}
