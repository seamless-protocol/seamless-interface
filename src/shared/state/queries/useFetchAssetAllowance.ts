import { Address, erc20Abi } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { useToken } from "../meta-data-queries/useToken";

/**
 * Custom hook for fetching asset allowance.
 *
 * @param {Address} asset - The address of the ERC20 token contract.
 * @param {Address} spender - The address of the spender to check allowance for.
 */
// todo convert this to new approach, add fetch function
export const useFetchAssetAllowance = ({ asset, spender }: { asset?: Address; spender?: Address }) => {
  const account = useAccount();

  const { data: tokenData } = useToken(asset);

  const { data: allowance, ...rest } = useReadContract({
    address: asset,
    abi: erc20Abi,
    functionName: "allowance",
    args: [account.address as Address, spender!],
    query: {
      enabled: !!asset && !!spender && !!account.address,
    },
  });

  const retData =
    tokenData && allowance
      ? {
          bigIntValue: allowance,
          decimals: tokenData.decimals,
          symbol: tokenData.symbol,
        }
      : undefined;

  return {
    ...rest,
    data: retData,
  };
};
