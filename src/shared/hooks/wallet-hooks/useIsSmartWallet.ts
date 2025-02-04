import { useQuery } from "@tanstack/react-query";
import { Config, useAccount, useConfig } from "wagmi";
import { isAddress } from "viem";
import { getPublicClient } from "wagmi/actions";

async function isSmartContractWallet(config: Config, address?: string) {
  try {
    const client = getPublicClient(config);
    if (!address) return false;
    if (!isAddress(address)) return false;
    if (!client) throw new Error("No client found");
    const code = await client.getCode({ address });
    if (!code) return false;
    return code.length > 2;
  } catch (error) {
    console.error("Error checking contract wallet:", error);
    return false;
  }
}

export function useSmartWalletCheck() {
  const { address, isConnected, chainId } = useAccount();
  const config = useConfig();

  const { data: isSmartWallet, ...rest } = useQuery({
    queryKey: ["hookSmartWallet", address, isConnected, chainId],
    queryFn: async () => {
      return isSmartContractWallet(config, address);
    },
    enabled: !!address && isConnected,
  });

  return { ...rest, isSmartWallet };
}
