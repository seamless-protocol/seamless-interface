import { createConnector } from "wagmi";
import { base } from "viem/chains";
import createWallet from "./createRandomWallet";

// Function to create test connector with dynamic wallet
export const createTestConnector = (rpcUrl: string) => {
  const randomWalletClient = createWallet(rpcUrl);

  return createConnector(() => ({
    id: "testConnector",
    name: "Test Connector",
    type: "",
    async connect() {
      return {
        accounts: [randomWalletClient.account.address],
        chainId: base.id,
      };
    },
    async disconnect() {},
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
    onAccountsChanged() {},
    onChainChanged() {},
    async onDisconnect() {},
    async getProvider() {},
  }));
};
