import { http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base as viem_base } from "viem/chains";
import { createConfig } from "wagmi";
import { mock } from "@wagmi/connectors";

export const initTestWagmiConfig = (rpcUrl: string, privateKey: string) => {
  const accounts = [privateKeyToAccount(privateKey as `0x${string}`).address] as const;

  const rpcUrls = {
    rpcUrls: {
      default: {
        http: [rpcUrl],
      },
    },
  }

  const base = {
    ...viem_base,
    ...rpcUrls,
  } as const;

  return createConfig({
    connectors: [mock({ accounts, features: { defaultConnected: true } })],
    chains: [base],
    transports: {
      [base.id]: http(),
    },
  });
};
