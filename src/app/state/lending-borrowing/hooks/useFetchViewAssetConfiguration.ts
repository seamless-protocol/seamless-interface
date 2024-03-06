import { Address } from "viem";
import { Displayable, useSeamlessContractRead } from "../../../../shared";
import {
  protocolDataProviderAbi,
  protocolDataProviderAddress,
} from "../../../generated";
import { Fetch, FetchBigInt } from "../../../../shared/types/Fetch";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewAssetConfiguration } from "../types/ViewAssetConfiguration";

interface AssetConfiguration {
  ltv: FetchBigInt;
  liquidationThreshold: FetchBigInt;
  liquidationPenalty: FetchBigInt;
  reserveFactor: FetchBigInt;
}

export const useFetchAssetConfiguration = (
  asset: Address
): Fetch<AssetConfiguration> => {
  const { isLoading, isFetched, data } = useSeamlessContractRead({
    address: protocolDataProviderAddress,
    abi: protocolDataProviderAbi,
    functionName: "getReserveConfigurationData",
    args: [asset],
  });

  const [, ltv, liquidationThreshold, liquidationBonus, reserveFactor] = data
    ? data
    : [, 0n, 0n, 0n, 0n];

  return {
    isLoading,
    isFetched,
    ltv: {
      bigIntValue: ltv,
      decimals: 2,
      symbol: "%",
    },
    liquidationThreshold: {
      bigIntValue: liquidationThreshold,
      decimals: 2,
      symbol: "%",
    },
    liquidationPenalty: {
      bigIntValue: liquidationBonus - 10000n,
      decimals: 2,
      symbol: "%",
    },
    reserveFactor: {
      bigIntValue: reserveFactor,
      decimals: 2,
      symbol: "%",
    },
  };
};

export const useFetchViewAssetConfiguration = (
  asset: Address
): Displayable<ViewAssetConfiguration> => {
  const {
    isLoading,
    isFetched,
    ltv,
    liquidationThreshold,
    liquidationPenalty,
    reserveFactor,
  } = useFetchAssetConfiguration(asset);

  return {
    isLoading,
    isFetched,
    data: {
      ltv: formatFetchBigIntToViewBigInt(ltv),
      liquidationThreshold: formatFetchBigIntToViewBigInt(liquidationThreshold),
      liquidationPenalty: formatFetchBigIntToViewBigInt(liquidationPenalty),
      reserveFactor: formatFetchBigIntToViewBigInt(reserveFactor),
    },
  };
};
