import React, { useEffect } from 'react'
import { useConnect, WagmiProvider } from 'wagmi'
import { config } from '../config/rainbow.config'
import { testWagmiConfig } from '../config/demoConnector/testWagmiConfig'
import { IS_DEV_MODE } from '../../globals';
import { testConnector } from '../config/demoConnector/testConnector';

// todo: refactor this
export const IS_IN_TEST_MODE = false;

export const CustomWagmiProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (IS_IN_TEST_MODE && IS_DEV_MODE) ? <TestWagmiProvider>{children}</TestWagmiProvider>
    : <StandardWagmiProvider>{children}</StandardWagmiProvider>;
}

const TestWagmiProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  // eslint-disable-next-line no-console
  console.warn('----------------USING TEST WAGMI PROVIDER----------------');

  return (
    <WagmiProvider config={testWagmiConfig}>
      <TestWagmiAutoConnector>
        {children}
      </TestWagmiAutoConnector>
    </WagmiProvider>
  )
}
const TestWagmiAutoConnector: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  // todo: move this auto connect into tests?
  const { connect } = useConnect();

  useEffect(() => {
    connect({ connector: testConnector });
  }, [connect]);

  return children;
}

const StandardWagmiProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      {children}
    </WagmiProvider>
  )
}