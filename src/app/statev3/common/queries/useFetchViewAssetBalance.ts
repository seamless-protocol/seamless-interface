import { Address, erc20Abi, zeroAddress } from "viem";
import { Displayable, FetchData, FetchBigInt, fetchToken } from "@shared";
import { DecimalsOptions, formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { useAccount } from "wagmi";
import { ViewAssetBalance } from "../types/ViewAssetBalance";
import { readContractQueryOptions } from "wagmi/query";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { getConfig } from "../../../utils/queryContractUtils";
import { getBalance } from "wagmi/actions";
import { useQuery } from "@tanstack/react-query";

export const fetchBalanceQueryOptions = (tokenAddress: Address, userAddress: Address) => {
  if (tokenAddress === zeroAddress) {
    return {
      queryKey: [
        "readContract",
        {
          address: tokenAddress,
          functionName: "balanceOf",
          args: [userAddress],
        },
      ],
      queryFn: async () => {
        const result = await getBalance(getConfig(), { address: userAddress });
        return result.value;
      },
    };
  }
  return {
    ...readContractQueryOptions(getConfig(), {
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [userAddress],
    }),
  };
};

async function _fetchBalance(address: Address, account: Address) {
  if (address === zeroAddress) {
    const config = getConfig();
    const result = await getBalance(config, {
      address: account,
    });
    return result.value;
  }
  const queryClient = getQueryClient();

  const result = await queryClient.fetchQuery({
    ...fetchBalanceQueryOptions(address, account),
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

export const fetchBalanceHookQK = (asset?: Address, account?: Address) => ["fetchAssetBalance", asset, account];

export const useFetchAssetBalance = (asset?: Address): FetchData<FetchBigInt | undefined> => {
  const { address } = useAccount();

  const { data: balance, ...restBalance } = useQuery({
    queryKey: fetchBalanceHookQK(asset, address),
    queryFn: () => fetchAssetBalance(asset!, address!),
    enabled: Boolean(asset) && Boolean(address),
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
