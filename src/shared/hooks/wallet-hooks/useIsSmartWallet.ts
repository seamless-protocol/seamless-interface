import { Address } from "viem";
import { useBytecode } from "wagmi";

export function useIsSmartWallet(address: Address | undefined) {
  const { data, ...rest } = useBytecode({ address });

  return { isSmartWallet: (data?.length || 0) > 2, ...rest };
}
