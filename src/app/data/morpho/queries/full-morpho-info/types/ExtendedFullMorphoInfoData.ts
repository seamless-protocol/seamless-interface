import { ViewBigInt, ViewNumber } from "@shared";
import { FullMorphoInfoData } from "./FullMorphoInfoData";

export interface ExtendedVaultPosition {
  vaultPosition: {
    sharesUsd: ViewNumber;
    shares: ViewBigInt;
  };
  mappedVaultDetails: FullMorphoInfoData;
}

export interface ExtendedMappedVaultPositionsResult {
  vaultPositions: ExtendedVaultPosition[];
  totalUsdValueViewValue: ViewNumber;
  totalUsdValue: number;
}
