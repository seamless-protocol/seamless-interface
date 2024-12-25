'use client';

import { BundlerAction } from '@morpho-org/morpho-blue-bundlers/pkg';
import { encodeFunctionData, parseEther, parseUnits } from 'viem';
import { useAccount, useSendTransaction } from 'wagmi';
import { useMorphoChainAgnosticBundlerV2 } from './useMorphoChainAgnosticBundlerV2';
import { useWETH } from './useWETH';
import { BundlerAbi } from './BundlerAbi';
import { useState } from 'react';

const selectedVault = {
  address: '0xa0E430870c4604CcfC7B38Ca7845B1FF653D0ff1',
}
export function DepositTest() {
  const { address, isConnected } = useAccount();
  const WETH = useWETH();
  const [amount, setAmount] = useState('0.001');
  const selectedAsset = {
    address: WETH,
    decimals: 18
  };
  const finalAmount =
    selectedAsset?.address === WETH ? parseEther(amount) : parseUnits(amount, selectedAsset?.decimals || 18);
  const { data: hash, sendTransactionAsync } = useSendTransaction();
  const bundlerAddress = useMorphoChainAgnosticBundlerV2();

  const finalizeTransaction = async () => {

    const data = encodeFunctionData({
      abi: BundlerAbi,
      functionName: 'multicall',
      args: [
        [
          BundlerAction.wrapNative(finalAmount) as any,
          BundlerAction.erc4626Deposit(selectedVault.address, WETH, 1, address as string) as any
        ]
      ]
    });
    await sendTransactionAsync({
      to: bundlerAddress,
      data,
      value: finalAmount
    });
  };

  return (
    <div
    >
      <div className="flex flex-col gap-4 justify-between items-center">
        <span className="text-[#919AAF] text-center">
          Morpho is the most efficient, secure, and flexible lending protocol on Ethereum.
        </span>
        <button
          onClick={finalizeTransaction}
        >ssss</button>
      </div>
    </div>
  );
}
