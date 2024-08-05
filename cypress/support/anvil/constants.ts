import { createTestClient, http, publicActions, walletActions } from "viem";
import { foundry } from "viem/chains";

export const anvilForkUrl = "http://127.0.0.1:8545";

export const testAnvilClient = createTestClient({
  chain: foundry,
  mode: "anvil",
  transport: http(anvilForkUrl),
})
  .extend(publicActions)
  .extend(walletActions);
