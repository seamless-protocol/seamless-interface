import { Address } from "viem";
import { useQuery } from "@tanstack/react-query";
import { fetchAssetPriceInBlock } from "./AssetPrice.hook";
import { Displayable, formatFetchBigIntToViewBigInt, formatUsdValue, ViewBigIntWithUsdValue } from "@shared";
import { cValueInUsd } from "../math/cValueInUsd";
import { disableCacheQueryConfig } from "../../state/settings/queryConfig";
import { useAccount } from "wagmi";
import { fetchAssetBalance } from "./AssetBalance.hook";
import { fetchTokenData } from "../metadata/TokenData.fetch";

interface AssetBalanceUsdValuePairInput {
  asset: Address;
  blockNumber?: bigint;
}

export const useFetchFormattedAssetBalanceWithUsdValue = ({
  asset,
  blockNumber,
}: AssetBalanceUsdValuePairInput): Displayable<ViewBigIntWithUsdValue | undefined> => {
  const { address } = useAccount();

  const { data, ...rest } = useQuery({
    queryKey: ["hookAssetBalanceUsdValue", address, asset, blockNumber],
    queryFn: async () => {
      const [assetBalance, assetPrice, tokenData] = await Promise.all([
        fetchAssetBalance({ account: address!, asset }),
        fetchAssetPriceInBlock(asset, blockNumber),
        fetchTokenData(asset),
      ]);

      const usdValue = cValueInUsd(assetBalance.bigIntValue, assetPrice.bigIntValue, assetBalance.decimals);

      return {
        ...tokenData,
        tokenAmount: formatFetchBigIntToViewBigInt(assetBalance),
        dollarAmount: formatFetchBigIntToViewBigInt(formatUsdValue(usdValue)),
      } as ViewBigIntWithUsdValue;
    },
    enabled: !!address && !!asset,
    ...disableCacheQueryConfig,
  });

  return {
    data: data || undefined,
    ...rest,
  };
};
