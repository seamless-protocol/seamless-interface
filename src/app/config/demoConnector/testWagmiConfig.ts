import { http } from "viem";
import { base } from "viem/chains";
import { createConfig } from "wagmi";
import { testConnector } from "./testConnector";

export const testWagmiConfig = createConfig({
  connectors: [testConnector],
  chains: [base],
  transports: {
    [base.id]: http(
      import.meta.env.VITE_TEST_RPC_URL
    ),
  },
});