import { Address } from "viem";
import { Displayable } from "../../../../shared";
import { protocolDataProviderAbi, protocolDataProviderAddress } from "../../../generated";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewAssetConfiguration } from "../types/ViewAssetConfiguration";
import { useReadContract } from "wagmi";

interface AssetConfiguration {
  ltv: FetchBigInt;
  liquidationThreshold: FetchBigInt;
  liquidationPenalty: FetchBigInt;
  reserveFactor: FetchBigInt;
}

export const useFetchAssetConfiguration = (asset?: Address): FetchData<AssetConfiguration> => {
  const { data, ...rest } = useReadContract({
    address: protocolDataProviderAddress,
    abi: protocolDataProviderAbi,
    functionName: "getReserveConfigurationData",
    args: [asset!],
    query: {
      enabled: !!asset,
    },
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

export const useFetchViewAssetConfiguration = (asset: Address): Displayable<ViewAssetConfiguration> => {
  const {
    data: { ltv, liquidationThreshold, liquidationPenalty, reserveFactor },
    ...rest
  } = useFetchAssetConfiguration(asset);

  return {
    ...rest,
    data: {
      ltv: formatFetchBigIntToViewBigInt(ltv),
      liquidationThreshold: formatFetchBigIntToViewBigInt(liquidationThreshold),
      liquidationPenalty: formatFetchBigIntToViewBigInt(liquidationPenalty),
      reserveFactor: formatFetchBigIntToViewBigInt(reserveFactor),
    },
  };
};
