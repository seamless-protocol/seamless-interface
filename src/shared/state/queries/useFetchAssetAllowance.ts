import { Address, erc20Abi } from "viem";
import { useAccount } from "wagmi";
import { fetchToken } from "../meta-data-queries/useToken";
import { readContract } from "wagmi/actions";
import { getConfig } from "../../../app/utils/queryContractUtils";
import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "../../../app/data/settings/queryConfig";

export const fetchAllowance = async (asset: Address, spender: Address, userAddress: Address) => {
  const config = getConfig();

  const [tokenData, allowance] = await Promise.all([
    fetchToken(asset),
    readContract(config, {
      address: asset,
      abi: erc20Abi,
      functionName: "allowance",
      args: [userAddress, spender],
    }),
  ]);

  if (!tokenData || allowance == null) {
    throw new Error("Failed to fetch token data or allowance");
  }

  return {
    bigIntValue: allowance,
    decimals: tokenData.decimals,
    symbol: tokenData.symbol,
  };
};

export const getFetchAllowanceQueryKey = (asset?: Address, spender?: Address, userAddress?: Address) => [
  "hookFetchAllowance",
  asset,
  spender,
  userAddress,
];

/**
 * Custom hook for fetching asset allowance.
 *
 * @param {Address} asset - The address of the ERC20 token contract.
 * @param {Address} spender - The address of the spender to check allowance for.
 */
export const useFetchAssetAllowance = ({ asset, spender }: { asset?: Address; spender?: Address }) => {
  const account = useAccount();

  const { data, ...rest } = useQuery({
    queryKey: getFetchAllowanceQueryKey(asset, spender, account.address),
    queryFn: () => fetchAllowance(asset!, spender!, account.address!),
    enabled: !!asset && !!spender && !!account.address,
    ...queryConfig.semiSensitiveDataQueryConfig,
  });

  return {
    ...rest,
    queryKey: getFetchAllowanceQueryKey(asset, spender, account.address),
    data,
  };
};
