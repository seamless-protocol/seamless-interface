import { Address, erc20Abi } from "viem";
import { useReadContract } from "wagmi";

export const useFetchAssetDecimals = (asset: Address) => {
  const { data: decimals } = useReadContract({
    address: asset,
    abi: erc20Abi,
    functionName: "decimals",
  });

  return { decimals };
};
