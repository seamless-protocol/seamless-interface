import { createWalletClient as createRandomWallet, http } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains";

export default createRandomWallet({
  account: privateKeyToAccount("0xe30165a9c8c2a7f249f1cf04ba5f2ed8afacb762cc813a66b86c898cc806d58a"),
  chain: mainnet,
  transport: http(),
});
