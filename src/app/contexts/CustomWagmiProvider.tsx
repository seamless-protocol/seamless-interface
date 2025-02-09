import React from "react";
import { WagmiProvider } from "wagmi";
import { config as standardConfig } from "../config/rainbow.config";
import { IS_DEV_MODE, IS_TEST_MODE, LOCALSTORAGE_TESTNET_URL_KEY, TENDERLY_RPC_URL } from "../../globals";
import { useLocalStorage } from "@uidotdev/usehooks";
import { initTestWagmiConfig } from "../config/demoConnector/testWagmiConfig";

// todo: put this in one place
const PRIVATE_KEY = "PRIVATE_KEY";

export const CustomWagmiProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return IS_TEST_MODE && IS_DEV_MODE ? (
    <TestWagmiProvider>{children}</TestWagmiProvider>
  ) : (
    <StandardWagmiProvider>{children}</StandardWagmiProvider>
  );
};

const TestWagmiProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // eslint-disable-next-line no-console
  console.warn("----------------USING TEST WAGMI PROVIDER----------------");
  const [TESTNET_URL] = useLocalStorage<{
    forkUrl: string;
  }>(LOCALSTORAGE_TESTNET_URL_KEY);
  const [KEY] = useLocalStorage<{
    KEY: string;
  }>(PRIVATE_KEY);

  return (
    <WagmiProvider config={initTestWagmiConfig(TESTNET_URL.forkUrl, KEY.KEY) as any}>
      {children}
    </WagmiProvider>
  );
};

const StandardWagmiProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <WagmiProvider config={standardConfig}>{children}</WagmiProvider>;
};
