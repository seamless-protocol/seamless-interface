import { fallback, http, FallbackTransport, HttpTransport } from "viem";
import { base } from "viem/chains";
import { createConfig } from "wagmi";
import { createTestConnector } from "./testConnector";

export const initTestWagmiConfig = (rpcUrl: string) => {
  const testConnector = createTestConnector(rpcUrl);

  const fallbackTransport: FallbackTransport<[HttpTransport]> = fallback([http(rpcUrl)]);

  return createConfig({
    connectors: [testConnector],
    chains: [base],
    transports: {
      [base.id]: fallbackTransport,
    },
  });
};
