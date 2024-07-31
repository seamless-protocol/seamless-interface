import React, { useEffect } from "react";
import { useConnect, WagmiProvider } from "wagmi";
import { config as standardConfig } from "../config/rainbow.config";
import { IS_DEV_MODE } from "../../globals";
import { useLocalStorage } from "@uidotdev/usehooks";
import { initTestWagmiConfig } from "../config/demoConnector/testWagmiConfig";
import { createTestConnector } from "../config/demoConnector/testConnector";

// todo: put this in one place
const VIRTUAL_TESTNET_KEY = "VIRTUAL_TESTNET_KEY";

export const CustomWagmiProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [TESTNET_URL] = useLocalStorage<{
    forkUrl: string;
  }>(VIRTUAL_TESTNET_KEY);

  return TESTNET_URL?.forkUrl && IS_DEV_MODE ? (
    <TestWagmiProvider rpcUrl={TESTNET_URL.forkUrl}>{children}</TestWagmiProvider>
  ) : (
    <StandardWagmiProvider>{children}</StandardWagmiProvider>
  );
};

const TestWagmiProvider: React.FC<{
  children: React.ReactNode;
  rpcUrl: string;
}> = ({ children, rpcUrl }) => {
  // eslint-disable-next-line no-console
  console.warn("----------------USING TEST WAGMI PROVIDER----------------");

  return (
    <WagmiProvider config={initTestWagmiConfig(rpcUrl)}>
      <TestWagmiAutoConnector>{children}</TestWagmiAutoConnector>
    </WagmiProvider>
  );
};

const TestWagmiAutoConnector: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [TESTNET_URL] = useLocalStorage<{
    forkUrl: string;
  }>(VIRTUAL_TESTNET_KEY);

  const { connect } = useConnect();

  useEffect(() => {
    connect({ connector: createTestConnector(TESTNET_URL.forkUrl) });
  }, [connect]);

  return <>{children}</>;
};

const StandardWagmiProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <WagmiProvider config={standardConfig}>{children}</WagmiProvider>;
};
