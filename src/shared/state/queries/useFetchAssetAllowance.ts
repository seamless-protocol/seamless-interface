import { Address, erc20Abi } from "viem";
import { useSeamlessContractRead } from "../../wagmi-wrapper/hooks/useSeamlessContractRead";
import { useAccount } from "wagmi";
import { useToken } from "../meta-data-queries/useToken";
import { mergeQueryStates } from "../../formatters/mergeQueryStates";

/**
 * Custom hook for fetching asset allowance.
 *
 * @param {Address} asset - The address of the ERC20 token contract.
 * @param {Address} spender - The address of the spender to check allowance for.
 */
export const useFetchAssetAllowance = ({ asset, spender }: { asset?: Address; spender?: Address }) => {
  const account = useAccount();

  const { data: tokenData, ...restToken } = useToken(asset);

  const {
    data: allowance,
    ...rest
  } = useSeamlessContractRead({
    address: asset,
    abi: erc20Abi,
    functionName: "allowance",
    args: [account.address as Address, spender!],
    query: {
      enabled: !!asset && !!spender && !!account.address,
    }
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
    ...mergeQueryStates([restToken, rest]),
    data: retData,
  };
};
