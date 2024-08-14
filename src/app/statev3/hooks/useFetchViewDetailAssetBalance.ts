import { Address } from "viem";
import { Config } from "wagmi";
import { fetchAssetBalance } from "../queries/useFetchAssetBalance";
import { fetchAssetPriceInBlock } from "../../state/common/queries/useFetchViewAssetPrice";
import { FetchDetailBigInt, fUsdValueStructured } from "../../../shared";
import { useQuery } from "@tanstack/react-query";
import { cValueInUsd } from "../../state/common/math/cValueInUsd";

interface FetchDetailAssetBalanceInput {
  config: Config;
  account: Address;
  asset: Address;
}

export async function fetchDetailAssetBalance({
  config,
  account,
  asset,
}: FetchDetailAssetBalanceInput): Promise<FetchDetailBigInt> {
  const [balance, price] = await Promise.all([
    fetchAssetBalance({ config, account, asset }),
    fetchAssetPriceInBlock(config, asset),
  ]);

  return {
    tokenAmount: balance,
    dollarAmount: fUsdValueStructured(cValueInUsd(balance.bigIntValue, price, balance.decimals)),
  };
}

export const useFetchDetailAssetBalance = (
  config: Config,
  account: Address | undefined,
  asset: Address | undefined
) => {
  return useQuery({
    queryKey: ["fetchDetailAssetBalance", account, asset],
    queryFn: () => fetchDetailAssetBalance({ config, account: account!, asset: asset! }),
    enabled: !!account && !!asset,
  });
};
