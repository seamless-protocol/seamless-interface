import { createConnector } from "wagmi";
import { base } from "viem/chains";
import randomWalletClient from "./createRandomWallet";

export const testConnector = createConnector(() => ({
  id: "testConnector",
  name: "Test Connector",
  type: "",
  // eslint-disable-next-line @typescript-eslint/require-await
  async connect() {
    return {
      accounts: [randomWalletClient.account.address],
      chainId: base.id,
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async disconnect() { },
  // eslint-disable-next-line @typescript-eslint/require-await
  async getAccounts() {
    return [randomWalletClient.account.address];
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  async getClient() {
    return {
      ...randomWalletClient,
    };
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  async getChainId() {
    return base.id;
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  async isAuthorized() {
    return true;
  },
  onAccountsChanged() { },
  onChainChanged() { },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async onDisconnect() { },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getProvider() { },
}));
