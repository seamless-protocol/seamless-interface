import { createConnector } from "wagmi";
import { base } from "viem/chains";
import randomWalletClient from "./createRandomWallet";

// todo: finish other functions in testConnector
export const testConnector = createConnector(() => ({
  id: "testConnector",
  name: "Test Connector",
  type: "",
  async connect() {
    return {
      accounts: [randomWalletClient.account.address],
      chainId: base.id,
    };
  },

  async disconnect() { },
  async getAccounts() {
    return [randomWalletClient.account.address];
  },
  async getClient() {
    return {
      ...randomWalletClient,
    };
  },
  async getChainId() {
    return base.id;
  },
  async isAuthorized() {
    return true;
  },
  onAccountsChanged() { },
  onChainChanged() { },
  async onDisconnect() { },
  async getProvider() { },
}));
