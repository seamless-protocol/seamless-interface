import { Address } from "viem";
import { fetchAssetBalance } from "../queries/useFetchAssetBalance";
import { FetchDetailBigInt, fUsdValueStructured } from "../../../shared";
import { useQuery } from "@tanstack/react-query";
import { cValueInUsd } from "../../state/common/math/cValueInUsd";
import { fetchAssetPriceInBlock } from "../queries/useFetchViewAssetPrice";

interface FetchDetailAssetBalanceInput {
  account: Address;
  asset: Address;
}

export async function fetchDetailAssetBalance({
  account,
  asset,
}: FetchDetailAssetBalanceInput): Promise<FetchDetailBigInt> {
  const [balance, price] = await Promise.all([fetchAssetBalance({ account, asset }), fetchAssetPriceInBlock(asset)]);

  return {
    tokenAmount: balance,
    dollarAmount: fUsdValueStructured(cValueInUsd(balance.bigIntValue, price, balance.decimals)),
  };
}

export const useFetchDetailAssetBalance = (account: Address | undefined, asset: Address | undefined) => {
  return useQuery({
    queryKey: ["fetchDetailAssetBalance", account, asset],
    queryFn: () => fetchDetailAssetBalance({ account: account!, asset: asset! }),
    enabled: !!account && !!asset,
  });
};
