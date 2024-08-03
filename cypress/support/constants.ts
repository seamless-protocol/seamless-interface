import { createTestClient, http, publicActions, walletActions } from "viem";
import { foundry } from "viem/chains";
import { anvilForkUrl } from "./anvil/constants";

export const targetAccount = "0x818DB96e1b5c64bBE6307c95473E313c743FF7d0";

export const usdcAddress = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
export const WETH_ADDRESS = "0x4200000000000000000000000000000000000006";
export const WSTETH_ADDRESS = "0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452";

export const VIRTUAL_TESTNET_KEY = "VIRTUAL_TESTNET_KEY";
export const VIRTUAL_TESTNET_SNAPSHOT = "VIRTUAL_TESTNET_SNAPSHOT";

export const testAnvilClient = createTestClient({
  chain: foundry,
  mode: "anvil",
  transport: http(anvilForkUrl),
})
  .extend(publicActions)
  .extend(walletActions);
