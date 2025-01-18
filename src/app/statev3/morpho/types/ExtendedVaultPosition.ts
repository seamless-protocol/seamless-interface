import { UserVaultPositionsQuery } from "../../../../generated-graphql";
import { ViewNumber } from "@shared";
import { MappedVaultData } from "./MappedFullVaultData";

export interface ExtendedVaultPosition {
  vaultPosition: UserVaultPositionsQuery["userByAddress"]["vaultPositions"][number];
  mappedVaultDetails: MappedVaultData;
}

export interface ExtendedMappedVaultPositionsResult {
  vaultPositions: ExtendedVaultPosition[];
  totalUsdValueViewValue: ViewNumber;
  totalUsdValue: number;
}