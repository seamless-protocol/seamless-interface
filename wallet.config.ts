import { http } from "viem";
import * as chains from "wagmi/chains";
import { injected, safe } from "wagmi/connectors";

export type WalletConfig = {
  appName: string;

  targetNetwork: chains.Chain; // make this array?
  walletConnectProjectId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  connectors: any[]; //todo
  onlyLocalBurnerWallet: boolean;
  walletAutoConnect: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chains: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transports: any;
};

export const walletConfig = {
  appName: "Seamless protocol",

  targetNetwork: chains.base,
  connectors: [injected(), safe()],

  walletConnectProjectId:
    import.meta.env.VITE_BASE_WALLET_PROJECT_ID ||
    "3a8170812b534d0ff9d794f19a901d64",

  onlyLocalBurnerWallet: true,
  walletAutoConnect: true,

  chains: [chains.base],
  transports: {
    [chains.base.id]: http(import.meta.env.VITE_BASE_RPC_URL),
  },
} satisfies WalletConfig;
