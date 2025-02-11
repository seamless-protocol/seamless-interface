import { Address, erc20Abi, zeroAddress } from "viem";
import { Displayable, FetchData, FetchBigInt, fetchToken } from "@shared";
import { DecimalsOptions, formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { useAccount } from "wagmi";
import { ViewAssetBalance } from "../types/ViewAssetBalance";
import { readContractQueryOptions } from "wagmi/query";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { getConfig } from "../../../utils/queryContractUtils";
import { getPublicClient } from "wagmi/actions";
import { useQuery } from "@tanstack/react-query";

async function _fetchBalance(address: Address, account: Address) {
  if (address === zeroAddress) {
    const config = getConfig();
    const publicClient = getPublicClient(config);
    if (!publicClient) throw new Error("Public client not found");
    const result = await publicClient.getBalance({ address: account });
    return result;
  }
  const queryClient = getQueryClient();

  const result = await queryClient.fetchQuery({
    ...readContractQueryOptions(getConfig(), {
      address,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [account],
    }),
  });

  return result;
}

export async function fetchAssetBalance(asset: Address, account: Address): Promise<FetchBigInt | undefined> {
  const [token, balance] = await Promise.all([fetchToken(asset), _fetchBalance(asset, account)]);

  return {
    bigIntValue: balance,
    symbol: token.symbol,
    decimals: token.decimals,
  };
}

export const useFetchAssetBalance = (asset?: Address): FetchData<FetchBigInt | undefined> => {
  const account = useAccount();

  const { data: balance, ...restBalance } = useQuery({
    queryKey: ["fetchAssetBalance", asset, account?.address],
    queryFn: () => fetchAssetBalance(asset!, account?.address!),
    enabled: !!asset && !!account?.address,
  });

  return {
    ...restBalance,
    data: balance,
  };
};

export const useFetchViewAssetBalance = (
  asset?: Address,
  decimalsOptions?: Partial<DecimalsOptions>
): Displayable<ViewAssetBalance> => {
  const { data: balance, ...rest } = useFetchAssetBalance(asset);

  return {
    ...rest,
    data: {
      balance: formatFetchBigIntToViewBigInt(balance, decimalsOptions),
    },
  };
};
