import { fallback, http } from "viem";
import { base } from "viem/chains";
import { createConfig } from "wagmi";
import { createTestConnector } from "./testConnector";

export const initTestWagmiConfig = (rpcUrl: string) => {
  const testConnector = createTestConnector(rpcUrl);

  return createConfig({
    connectors: [testConnector],
    chains: [base],
    transports: {
      [base.id]: fallback([http(rpcUrl)]),
    },
  });
};
