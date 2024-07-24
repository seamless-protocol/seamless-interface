import { createWalletClient as createRandomWallet, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";

// todo: move to env variables
export const VITE_TEST_RPC_URL = "https://virtual.base.rpc.tenderly.co/55ec1a11-fb48-4d5e-a7b3-dea034a0f06c"; // Cypress?.env("VITE_TEST_RPC_URL");
export const VITE_TEST_PRIVATE_KEY = "0xe30165a9c8c2a7f249f1cf04ba5f2ed8afacb762cc813a66b86c898cc806d58a"; // Cypress?.env("VITE_TEST_PRIVATE_KEY");

export default createRandomWallet({
  account: privateKeyToAccount(VITE_TEST_PRIVATE_KEY),
  chain: base,
  transport: http(
    VITE_TEST_RPC_URL
  ),
});
