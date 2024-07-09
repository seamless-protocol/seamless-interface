import { createConnector } from "wagmi";
import { base } from "viem/chains";
import randomWalletClient from "./createRandomWallet";

// wagmi connector for demos
export const demoConnector = createConnector(() => ({
  id: "demoConnector",
  name: "Demo Connector",
  type: "mock",
  // eslint-disable-next-line @typescript-eslint/require-await
  async connect() {
    return {
      accounts: [randomWalletClient.account.address],
      chainId: base.id,
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async disconnect() {},
  // eslint-disable-next-line @typescript-eslint/require-await
  async getAccounts() {
    return [randomWalletClient.account.address];
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  async getClient() {
    return randomWalletClient;
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  async getChainId() {
    return base.id;
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  async isAuthorized() {
    return true;
  },
  onAccountsChanged() {},
  onChainChanged() {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async onDisconnect() {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getProvider() {},
  async getFeeData() {
    return {
      maxFeePerGas: 1000000000000000, // Set a high max fee per gas (10 Gwei)
      maxPriorityFeePerGas: 20000000000000000, // Set a high max priority fee per gas (2 Gwei)
    };
  },
}));
