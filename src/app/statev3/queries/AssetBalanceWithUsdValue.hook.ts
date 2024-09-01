import { Address } from "viem";
import { useQuery } from "@tanstack/react-query";
import { fetchAssetPriceInBlock } from "./AssetPrice.hook";
import { Displayable, formatFetchBigIntToViewBigInt, formatUsdValue, ViewBigIntWithUsdValue } from "@shared";
import { cValueInUsd } from "../math/utils";
import { disableCacheQueryConfig } from "../../state/settings/queryConfig";
import { useAccount } from "wagmi";
import { fetchAssetBalance } from "./AssetBalance.hook";

interface AssetBalanceUsdValuePairInput {
  asset?: Address;
  blockNumber?: bigint;
}

export const useFetchFormattedAssetBalanceWithUsdValue = ({
  asset,
}: AssetBalanceUsdValuePairInput): Displayable<ViewBigIntWithUsdValue | undefined> => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["hookAssetBalanceUsdValue", address, asset],
    queryFn: async () => {
      const [assetBalance, assetPrice] = await Promise.all([
        fetchAssetBalance({ account: address!, asset: asset! }),
        fetchAssetPriceInBlock(asset!),
      ]);

      const usdValue = cValueInUsd(assetBalance.bigIntValue, assetPrice.bigIntValue, assetBalance.decimals);

      return {
        tokenAmount: formatFetchBigIntToViewBigInt(assetBalance),
        dollarAmount: formatFetchBigIntToViewBigInt(formatUsdValue(usdValue)),
      } as ViewBigIntWithUsdValue;
    },
    enabled: !!address && !!asset,
    ...disableCacheQueryConfig,
  });
};
