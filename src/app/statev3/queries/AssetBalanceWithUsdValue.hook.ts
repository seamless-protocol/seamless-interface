import { Address } from "viem";
import { useQuery } from "@tanstack/react-query";
import { fetchAssetPriceInBlock } from "./AssetPrice.hook";
import { Displayable, formatFetchBigIntToViewBigInt, formatUsdValue, ViewBigIntWithUsdValue } from "@shared";
import { cValueInUsd } from "../math/utils";
import { queryConfig } from "../settings/queryConfig";
import { useAccount } from "wagmi";
import { fetchAssetBalance } from "./AssetBalance.hook";

interface AssetBalanceUsdValuePairInput {
  asset?: Address;
  blockNumber?: bigint;
}

const FORMATTED_ASSET_BALANCE_USD_VALUE_QUERY_KEY = ["FORMATTED_ASSET_BALANCE_USD_VALUE_QUERY_KEY"];
export const getFormattedAssetBalanceUsdValueQueryKey = (userAddress?: Address, asset?: Address) => [
  FORMATTED_ASSET_BALANCE_USD_VALUE_QUERY_KEY,
  userAddress,
  asset,
];

export const useFetchFormattedAssetBalanceWithUsdValue = ({
  asset,
}: AssetBalanceUsdValuePairInput): Displayable<ViewBigIntWithUsdValue | undefined> => {
  const { address: userAddress } = useAccount();

  return useQuery({
    queryKey: getFormattedAssetBalanceUsdValueQueryKey(userAddress, asset),
    queryFn: async () => {
      const [assetBalance, assetPrice] = await Promise.all([
        fetchAssetBalance({ account: userAddress!, asset: asset! }),
        fetchAssetPriceInBlock(asset!),
      ]);
      console.log("testtest");

      const usdValue = cValueInUsd(assetBalance.bigIntValue, assetPrice.bigIntValue, assetBalance.decimals);

      return {
        tokenAmount: formatFetchBigIntToViewBigInt(assetBalance),
        dollarAmount: formatFetchBigIntToViewBigInt(formatUsdValue(usdValue)),
      } as ViewBigIntWithUsdValue;
    },
    enabled: !!userAddress && !!asset,
    ...queryConfig.semiSensitiveDataQueryConfig,
  });
};
