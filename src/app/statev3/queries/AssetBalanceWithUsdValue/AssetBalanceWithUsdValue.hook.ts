import { Address } from "viem";
import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "../../settings/queryConfig";
import { useAccount } from "wagmi";
import { fetchFormattedAssetBalanceUsdValue, getFormattedAssetBalanceUsdValueQueryKey } from "./AssetBalanceWithUsdValue.fetch";
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
    queryKey: getFormattedAssetBalanceUsdValueQueryKey(userAddress, asset),
    queryFn: async () => {
      const data = await fetchFormattedAssetBalanceUsdValue({ userAddress, asset });

      return {
        tokenAmount: formatFetchBigIntToViewBigInt(data?.tokenAmount),
        dollarAmount: formatFetchBigIntToViewBigInt(data?.dollarAmount),
      } as ViewBigIntWithUsdValue;
    },
    enabled: !!userAddress && !!asset,
    ...queryConfig.semiSensitiveDataQueryConfig,
  });
};
