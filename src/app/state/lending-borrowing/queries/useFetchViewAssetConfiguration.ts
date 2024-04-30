import { Address } from "viem";
import { RQResponse, useSeamlessContractRead } from "../../../../shared";
import { protocolDataProviderAbi, protocolDataProviderAddress } from "../../../generated";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewAssetConfiguration } from "../types/ViewAssetConfiguration";

interface AssetConfiguration {
  ltv: FetchBigInt;
  liquidationThreshold: FetchBigInt;
  liquidationPenalty: FetchBigInt;
  reserveFactor: FetchBigInt;
}

export const useFetchAssetConfiguration = (asset?: Address): FetchData<AssetConfiguration> => {
  const { data, ...rest } = useSeamlessContractRead({
    address: protocolDataProviderAddress,
    abi: protocolDataProviderAbi,
    functionName: "getReserveConfigurationData",
    args: [asset!],
    query: {
      enabled: !!asset
    }
  });

  const [, ltv, liquidationThreshold, liquidationBonus, reserveFactor] = data || [, 0n, 0n, 0n, 0n];

  return {
    ...rest,
    data: {
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
        bigIntValue: liquidationBonus - 10000n, // 10000n is 100%
        decimals: 2,
        symbol: "%",
      },
      reserveFactor: {
        bigIntValue: reserveFactor,
        decimals: 2,
        symbol: "%",
      },
    },
  };
};

export const useFetchViewAssetConfiguration = (asset: Address): RQResponse<ViewAssetConfiguration> => {
  const {
    isLoading,
    isFetched,
    data: { ltv, liquidationThreshold, liquidationPenalty, reserveFactor },
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
