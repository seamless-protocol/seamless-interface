import { UserVaultPositionsQuery } from "../../../../generated-graphql";
import { ViewBigInt, ViewNumber } from "@shared";
import { MappedVaultData } from "./MappedFullVaultData";

export interface ExtendedVaultPosition {
  vaultPosition: {
    baseData: UserVaultPositionsQuery["userByAddress"]["vaultPositions"][number];
    shares: ViewBigInt;
    assetsUsd: ViewNumber;
    assets: ViewBigInt;
  };
  mappedVaultDetails: MappedVaultData;
}

export interface ExtendedMappedVaultPositionsResult {
  vaultPositions: ExtendedVaultPosition[];
  totalUsdValueViewValue: ViewNumber;
  totalUsdValue: number;
}
