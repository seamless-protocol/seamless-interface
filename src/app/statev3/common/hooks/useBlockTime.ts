import { getPublicClient } from "wagmi/actions";
import { getConfig } from "../../../utils/queryContractUtils";
import { useQuery } from "@tanstack/react-query";

export const fetchBlockTime = async () => {
  const publicClient = getPublicClient(getConfig());

  if (!publicClient) {
    throw new Error("Public client not found");
  }

  const block = await publicClient.getBlock();

  return {
    block,
    formmattedBlockDate: block ? new Date(Number(block.timestamp) * 1000).toLocaleString() : undefined,
    currentDate: block ? new Date(Number(block.timestamp) * 1000) : undefined,
  };
};

export const useBlockTime = () => {
  return useQuery({
    queryKey: ["blockTime"],
    queryFn: () => fetchBlockTime(),
  });
};
