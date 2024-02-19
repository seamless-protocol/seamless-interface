import { Chain, http } from "viem";
import { base } from "wagmi/chains";
import logoSeamless from "@assets/logos/logo-seamless.svg";

export type WalletConfig = {
  appName: string;

  targetNetwork: Chain; // make this array?
  walletConnectProjectId: string;

  chains: Chain[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transports: any;

  appDescription: string;
  appUrl: string;
  appIcon: string;
};

export const walletConfig = {
  appName: "Seamless protocol",
  appDescription: `Seamless Protocol is the first native, decentralized, non-custodial lending and borrowing protocol on the Base network. 
    In the first month of being live, it has grown to be the largest native liquidity market (Top 20 TVL on Base, according to DefiLlama), enabling users to supply and borrow USDbC, ETH, and cbETH (with more assets underway). 
    Seamless enables users to engage in a new form of peer-to-peer borrowing/lending—Integrated Liquidity Markets (or ILMs, for short)—which are isolated, smart contract-to-smart contract markets for undercollateralized, yet still permissionless, borrowing.`,
  appUrl: "https://pre-interface.seamlessprotocol.com/",
  appIcon: logoSeamless,
  targetNetwork: base,
  walletConnectProjectId: import.meta.env.VITE_BASE_WALLET_PROJECT_ID || "",

  chains: [base],
  transports: {
    [base.id]: http(import.meta.env.VITE_BASE_RPC_URL),
  },
} satisfies WalletConfig;
