import { fallback, http, FallbackTransport, HttpTransport } from "viem";
import { base } from "viem/chains";
import { Config, createConfig } from "wagmi";
import { createTestConnector } from "./testConnector";

export const initTestWagmiConfig = (rpcUrl: string, privateKey: string) => {
  const testConnector = createTestConnector(rpcUrl, privateKey);

  const fallbackTransport: FallbackTransport<[HttpTransport]> = fallback([http(rpcUrl)]);

  const config =  createConfig({
    connectors: [testConnector],
    chains: [base],
    transports: {
      [base.id]: fallbackTransport,
    },
  });

  setTestConfig(config);

  return config;
};

export const testConfigContainer = {} as {
  config: Config
};

export const setTestConfig = (config: Config) => {
  testConfigContainer.config = config;
};