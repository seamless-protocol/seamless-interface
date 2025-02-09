import { fallback, http, FallbackTransport, HttpTransport } from "viem";
import { base } from "viem/chains";
import { createConfig } from "wagmi";
import { createTestConnector } from "./testConnector";

export const initTestWagmiConfig = (rpcUrl: string, privateKey: string) => {
  const testConnector = createTestConnector(rpcUrl, privateKey);

  const fallbackTransport: FallbackTransport<[HttpTransport]> = fallback([http(rpcUrl)]);

  return createConfig({
    connectors: [testConnector],
    chains: [base],
    transports: {
      [base.id]: fallbackTransport,
    },
  });
};
