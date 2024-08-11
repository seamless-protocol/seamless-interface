import { Address, erc20Abi } from "viem";
import { Config, useAccount, useConfig } from "wagmi";
import { getQueryClient } from "../../contexts/CustomQueryClientProvider";
import { readContractQueryOptions } from "wagmi/query";
import { FetchBigInt } from "../../../shared";
import { fetchTokenData } from "../metadata/useFetchTokenData";
import { useQuery } from "@tanstack/react-query";

interface FetchAssetBalanceInput {
  config: Config;
  account: Address;
  asset: Address;
}

export async function fetchAssetBalance({ config, account, asset }: FetchAssetBalanceInput): Promise<FetchBigInt> {
  const queryClient = getQueryClient();

  const [balance, { symbol, decimals }] = await Promise.all([
    queryClient.fetchQuery(
      readContractQueryOptions(config, {
        address: asset,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [account],
      })
    ),

    fetchTokenData(config, asset),
  ]);

  return {
    bigIntValue: balance,
    decimals,
    symbol,
  };
}

export const useFetchAssetBalance = (asset?: Address) => {
  const config = useConfig();

  const account = useAccount();

  return useQuery({
    queryKey: ["fetchAssetBalance", account.address, asset],
    queryFn: () => fetchAssetBalance({ config, account: account.address!, asset: asset! }),
    enabled: !!asset && !!account.address,
  });
};
