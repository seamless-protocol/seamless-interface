import { createTestClient, http, publicActions, walletActions } from "viem";
import { foundry } from "viem/chains";

export const forkUrl = "http://localhost:8545";

// Initialize the test client
const client = createTestClient({
  chain: foundry,
  mode: "anvil",
  transport: http(forkUrl),
})
  .extend(publicActions)
  .extend(walletActions);

const VIRTUAL_TESTNET_KEY = "VIRTUAL_TESTNET_KEY";

export const prepareTestForRun = () => {
  before(async () => {
    await setupTestEnvironment();
    cy.visit("/");
  });

  // Uncomment if you want to clean up after tests
  // after(async () => {
  //   localStorage.removeItem(VIRTUAL_TESTNET_KEY);
  // });
};

const setupTestEnvironment = async () => {
  // todo: wallet
  const targetAccount = "0x33EB4dEa4931e5d607531Fb08Bd393944aA01Faa";
  const amount = BigInt(1); // 1 ETH/WETH in Wei

  // await client.request({
  //   method: "anvil_setBalance",
  //   params: [targetAccount, `0x${amount.toString(16)}`],
  // });

  // Store RPC URL for Cypress
  localStorage.setItem(VIRTUAL_TESTNET_KEY, JSON.stringify({ forkUrl }));
};
