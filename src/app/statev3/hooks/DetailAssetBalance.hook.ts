import { Address } from "viem";
import { fetchAssetBalance } from "../queries/AssetBalance.hook";
import { FetchTokenAmountWithUsdValue, formatUsdValue } from "../../../shared";
import { useQuery } from "@tanstack/react-query";
import { fetchAssetPriceInBlock } from "../queries/AssetPrice.hook";
import { cValueInUsd } from "../math/cValueInUsd";

interface FetchDetailAssetBalanceInput {
  account: Address;
  asset: Address;
}

export async function fetchDetailAssetBalance({
  account,
  asset,
}: FetchDetailAssetBalanceInput): Promise<FetchTokenAmountWithUsdValue> {
  const [balance, price] = await Promise.all([fetchAssetBalance({ account, asset }), fetchAssetPriceInBlock(asset)]);

  return {
    tokenAmount: balance,
    dollarAmount: formatUsdValue(cValueInUsd(balance.bigIntValue, price.bigIntValue, balance.decimals)),
  };
}

export const useFetchDetailAssetBalance = (account: Address | undefined, asset: Address | undefined) => {
  return useQuery({
    queryKey: ["fetchDetailAssetBalance", account, asset],
    queryFn: () => fetchDetailAssetBalance({ account: account!, asset: asset! }),
    enabled: !!account && !!asset,
  });
};
