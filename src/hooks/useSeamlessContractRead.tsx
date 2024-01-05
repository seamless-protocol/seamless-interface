import { useChainId, useContractRead } from "wagmi";
import { getContractInfo } from "../utils/helpers";

export function useSeamlessContractRead({
  contractName,
  functionName,
  args,
}: {
  contractName: string;
  functionName: string;
  args: any[];
}) {
  const chainId = useChainId();
  const { address, abi } = getContractInfo(contractName);

  const params = {
    chainId,
    abi,
    address: address as `0x${string}`,
    functionName,
    args,
  };

  return useContractRead(params);
}
