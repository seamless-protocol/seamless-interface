import { Address } from "viem";
import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "../../../settings/queryConfig";
import { useAccount } from "wagmi";
import { fetchAssetBalanceUsdValue, getFormattedAssetBalanceUsdValueQueryKey } from "./AssetBalanceWithUsdValue.fetch";
import {
  DecimalsOptions,
  Displayable,
  FormattingOptions,
  ViewBigIntWithUsdValue,
  formatFetchBigIntToViewBigInt,
} from "@shared";

interface AssetBalanceUsdValuePairInput {
  asset?: Address;
  blockNumber?: bigint;
  decimalsOptions?: Partial<DecimalsOptions>;
  options?: FormattingOptions;
}

export const getHookFetchFormattedAssetBalanceWithUsdValueQueryKey = (userAddress?: Address, asset?: Address) => [
  "hook",
  ...getFormattedAssetBalanceUsdValueQueryKey(userAddress, asset),
];

export const useFetchFormattedAssetBalanceWithUsdValue = ({
  asset,
  blockNumber,
  decimalsOptions,
  options,
}: AssetBalanceUsdValuePairInput): Displayable<ViewBigIntWithUsdValue | undefined> => {
  const { address: userAddress } = useAccount();

  return useQuery({
    queryKey: getHookFetchFormattedAssetBalanceWithUsdValueQueryKey(userAddress, asset),
    queryFn: async () => {
      const result = await fetchAssetBalanceUsdValue({ userAddress, asset, blockNumber });

      return {
        tokenAmount: formatFetchBigIntToViewBigInt(result?.tokenAmount, decimalsOptions, options),
        dollarAmount: formatFetchBigIntToViewBigInt(result?.dollarAmount),
      };
    },
    enabled: !!userAddress && !!asset,
    ...queryConfig.disableCacheQueryConfig,
  });
};
