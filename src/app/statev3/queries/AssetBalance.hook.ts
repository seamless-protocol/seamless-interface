import { Address, erc20Abi } from "viem";
import { useAccount } from "wagmi";
import { FetchBigIntStrict } from "../../../shared";
import { fetchTokenData } from "../metadata/TokenData.fetch";
import { queryContract, queryOptions } from "../../utils/queryContractUtils";
import { useQuery } from "@tanstack/react-query";

interface FetchAssetBalanceInput {
  account: Address;
  asset: Address;
}

export async function fetchAssetBalance({ account, asset }: FetchAssetBalanceInput): Promise<FetchBigIntStrict> {
  const [balance, { symbol, decimals }] = await Promise.all([
    queryContract(
      queryOptions({
        address: asset,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [account],
      })
    ),

    fetchTokenData(asset),
  ]);

  return {
    bigIntValue: balance,
    decimals,
    symbol,
  };
}

export const useFetchAssetBalance = (asset?: Address) => {
  const account = useAccount();

  return useQuery({
    queryKey: ["fetchAssetBalance", account.address, asset],
    queryFn: () => fetchAssetBalance({ account: account.address!, asset: asset! }),
    enabled: !!asset && !!account.address,
  });
};
