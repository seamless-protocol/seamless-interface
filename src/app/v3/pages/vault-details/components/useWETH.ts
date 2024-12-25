import { useChainId } from 'wagmi';

interface ContractMap {
  [chainId: number]: `0x${string}`;
}

export function useWETH() {
  const chainId = useChainId();

  const contract: ContractMap = {
    8453: '0x4200000000000000000000000000000000000006'
  };

  return contract[chainId];
}
