import { useAccount } from "wagmi";

export type WalletName = "Coinbase Wallet" | "MetaMask" | undefined;

export const useWalletName = (): WalletName => {
  const { connector } = useAccount();

  if (connector?.name === "Coinbase Wallet") return "Coinbase Wallet";
  if (connector?.name === "MetaMask") return "MetaMask";
  // todo: for rest connectors

  return undefined;
};
