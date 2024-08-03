import { createWalletClient as createRandomWallet, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { anvil } from "viem/chains";

const createWallet = (rpcUrl: string, privateKey: string) =>
  createRandomWallet({
    account: privateKeyToAccount(privateKey as `0x${string}`),
    transport: http(rpcUrl),
    chain: anvil,
  });

export default createWallet;
