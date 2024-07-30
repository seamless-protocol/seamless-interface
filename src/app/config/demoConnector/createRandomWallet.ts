import { createWalletClient as createRandomWallet, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { anvil } from "viem/chains";

export const VITE_TEST_PRIVATE_KEY = "0xe30165a9c8c2a7f249f1cf04ba5f2ed8afacb762cc813a66b86c898cc806d58a"; // Cypress?.env("VITE_TEST_PRIVATE_KEY");

const createWallet = (rpcUrl: string) =>
  createRandomWallet({
    account: privateKeyToAccount(VITE_TEST_PRIVATE_KEY),
    transport: http(rpcUrl),
    chain: anvil,
  });

export default createWallet;
