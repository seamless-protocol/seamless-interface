import { ViewBigInt, ViewNumber } from "@shared";
import { MappedVaultData } from "./MappedFullVaultData";

export interface ExtendedVaultPosition {
  vaultPosition: {
    sharesUsd: ViewNumber;
    shares: ViewBigInt;
  }
  mappedVaultDetails: MappedVaultData;
}

export interface ExtendedMappedVaultPositionsResult {
  vaultPositions: ExtendedVaultPosition[];
  totalUsdValueViewValue: ViewNumber;
  totalUsdValue: number;
}
