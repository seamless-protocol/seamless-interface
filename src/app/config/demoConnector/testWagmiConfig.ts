import { fallback, http } from "viem";
import { base } from "viem/chains";
import { createConfig } from "wagmi";
import { testConnector } from "./testConnector";
// todo read from env
import { VITE_TEST_RPC_URL } from "./createRandomWallet";

export const testWagmiConfig = createConfig({
  connectors: [testConnector],
  chains: [base],
  transports: {
    [base.id]: fallback([http(VITE_TEST_RPC_URL)]),
  },
});
