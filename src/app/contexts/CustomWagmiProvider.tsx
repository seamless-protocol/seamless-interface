import React from 'react'
import { WagmiProvider } from 'wagmi'
import { config } from '../config/rainbow.config'
import { testWagmiConfig } from '../config/demoConnector/testWagmiConfig'
import { IS_DEV_MODE } from '../../globals';

// todo: refactor this
export const IS_IN_TEST_MODE = true;

export const CustomWagmiProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (IS_IN_TEST_MODE && IS_DEV_MODE) ? <TestWagmiProvider>{children}</TestWagmiProvider>
    : <StandardWagmiProvider>{children}</StandardWagmiProvider>;
}

const TestWagmiProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  console.warn('----------------USING TEST WAGMI PROVIDER----------------');

  return (
    <WagmiProvider config={testWagmiConfig}>
      {children}
    </WagmiProvider>
  )
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