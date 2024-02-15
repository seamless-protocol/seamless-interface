import * as chains from "wagmi/chains";
import { injected, safe } from "wagmi/connectors";

export type WalletConfig = {
  targetNetwork: chains.Chain; // make this array?
  walletConnectProjectId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  connectors: any[]; //todo
  onlyLocalBurnerWallet: boolean;
  walletAutoConnect: boolean;
};

export const walletConfig = {
  targetNetwork: chains.base,
  connectors: [injected(), safe()],

  walletConnectProjectId:
    process.env.VITE_BASE_WALLET_PROJECT_ID ||
    "3a8170812b534d0ff9d794f19a901d64",

  onlyLocalBurnerWallet: true,
  walletAutoConnect: true,
} satisfies WalletConfig;
