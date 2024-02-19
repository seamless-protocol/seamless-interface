import { Chain, http } from "viem";
import { base } from "wagmi/chains";

export type WalletConfig = {
  appName: string;

  targetNetwork: Chain; // make this array?
  walletConnectProjectId: string;

  chains: Chain[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transports: any;
};

export const walletConfig = {
  appName: "Seamless protocol",
  targetNetwork: base,
  walletConnectProjectId: import.meta.env.VITE_BASE_WALLET_PROJECT_ID || "",

  chains: [base],
  transports: {
    [base.id]: http(import.meta.env.VITE_BASE_RPC_URL),
  },
} satisfies WalletConfig;
