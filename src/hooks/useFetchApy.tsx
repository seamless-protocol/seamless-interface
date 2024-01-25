import { useBlockNumber, useReadContract } from "wagmi";
import { loopStrategyAbi, loopStrategyAddress } from "../generated/generated";
import { ONE_ETHER } from "../utils/constants";

export const useFetchShareValue = (blockNumber: bigint) => {
  const { data: equityUSD, isLoading: isLoadingEquityUSD } = useReadContract({
    address: loopStrategyAddress,
    abi: loopStrategyAbi,
    functionName: "equityUSD",
    blockNumber,
  });
  const { data: totalSupply, isLoading: isLoadingTotalSupply } =
    useReadContract({
      address: loopStrategyAddress,
      abi: loopStrategyAbi,
      functionName: "totalSupply",
      blockNumber,
    });

  let shareValue;
  if (equityUSD && totalSupply) {
    shareValue = (equityUSD * ONE_ETHER) / totalSupply;
  }

  return {
    shareValue,
    isLoading: isLoadingEquityUSD || isLoadingTotalSupply,
  };
};

export const useFetchApy = () => {
  const { data: latestBlock } = useBlockNumber();
  const { shareValue: currentShareValue, isLoading: isCurrShareValueLoading } =
    useFetchShareValue(latestBlock || 0n);
  const { shareValue: prevShareValue, isLoading: isPrevShareValueLoading } =
    useFetchShareValue(latestBlock ? latestBlock - 100n : 0n);

  return {
    // isLoading: isCurrShareValueLoading || isPrevShareValueLoading,
    apy: 0,
  };
};
