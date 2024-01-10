import { getContractInfo } from "../utils/helpers";
import { useReadContracts } from "wagmi";

interface SeamlessMulticallParams {
  contractName: string;
  functionName: string;
  args: any[];
}

export function useSeamlessContractReads(params: SeamlessMulticallParams[]) {
  const contracts = params.map((param) => {
    const { address, abi } = getContractInfo(param.contractName);

    return {
      address: address as `0x${string}`,
      abi,
      functionName: param.functionName,
      args: param.args,
    };
  });

  return useReadContracts({ contracts });
}
