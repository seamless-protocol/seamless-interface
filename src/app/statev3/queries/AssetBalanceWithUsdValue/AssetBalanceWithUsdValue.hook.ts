import { Address } from "viem";
import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "../../settings/queryConfig";
import { useAccount } from "wagmi";
import {
  fetchFormattedAssetBalanceUsdValue,
  getFormattedAssetBalanceUsdValueQueryKey,
} from "./AssetBalanceWithUsdValue.fetch";
import { Displayable, ViewBigIntWithUsdValue, formatFetchBigIntToViewBigInt } from "@shared";

interface AssetBalanceUsdValuePairInput {
  asset?: Address;
  blockNumber?: bigint;
}

export const useFetchFormattedAssetBalanceWithUsdValue = ({
  asset,
}: AssetBalanceUsdValuePairInput): Displayable<ViewBigIntWithUsdValue | undefined> => {
  const { address: userAddress } = useAccount();

  return useQuery({
    // todo
    queryKey: ["hook", ...getFormattedAssetBalanceUsdValueQueryKey(userAddress, asset)],
    queryFn: async () => {
      const result = await fetchFormattedAssetBalanceUsdValue({ userAddress, asset });

      return {
        tokenAmount: formatFetchBigIntToViewBigInt(result?.tokenAmount),
        dollarAmount: formatFetchBigIntToViewBigInt(result?.dollarAmount),
      };
    },
    enabled: !!userAddress && !!asset,
    ...queryConfig.disableCacheQueryConfig,
  });
};
