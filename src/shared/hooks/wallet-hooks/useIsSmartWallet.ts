import { useQuery } from "@tanstack/react-query";
import { Config, useAccount, useConfig } from "wagmi";
import { isAddress } from "viem";
import { getPublicClient } from "wagmi/actions";

async function isSmartContractWallet(address: string, config: Config) {
  try {
    const client = getPublicClient(config);
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
    queryKey: ["smartWallet", address, isConnected, chainId],
    queryFn: async () => {
      if (!address) return false;
      return isSmartContractWallet(address, config);
    },
    enabled: !!address && isConnected,
  });

  return { ...rest, isSmartWallet };
}
