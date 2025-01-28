import { ViewNumber } from "@shared";
import { MappedVaultData } from "./MappedFullVaultData";

export interface ExtendedVaultPosition {
  // vaultPosition: {
  //   baseData: NonNullable<NonNullable<UserVaultPositionsQuery["vaultPositions"]["items"]>[number]>;
  //   shares: ViewBigInt;
  //   assetsUsd: ViewNumber;
  //   assets: ViewBigInt;
  // };
  mappedVaultDetails: MappedVaultData;
}

export interface ExtendedMappedVaultPositionsResult {
  vaultPositions: ExtendedVaultPosition[];
  totalUsdValueViewValue: ViewNumber;
  totalUsdValue: number;
}
