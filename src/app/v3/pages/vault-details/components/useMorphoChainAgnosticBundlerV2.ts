import { useChainId } from 'wagmi';

interface ContractMap {
  [chainId: number]: `0x${string}`;
}

export function useMorphoChainAgnosticBundlerV2() {
  const chainId = useChainId();

  const contract: ContractMap = {
    8453: '0x23055618898e202386e6c13955a58d3c68200bfb'
  };

  return contract[chainId];
}
