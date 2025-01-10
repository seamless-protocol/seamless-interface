"use client";

import { BundlerAction } from "@morpho-org/morpho-blue-bundlers/pkg";
import { encodeFunctionData, parseEther, parseUnits } from "viem";
import { useAccount } from "wagmi";
import { useMorphoChainAgnosticBundlerV2 } from "./useMorphoChainAgnosticBundlerV2";
import { useWETH } from "./useWETH";
import { BundlerAbi } from "../../../../../../abis/BundlerAbi";
import { useState } from "react";
import { useSeamlessSendTransaction } from "@shared";
import { USDC_ADDRESS } from "../../../../../meta";

// NEW import

const selectedVault = {
  address: "0xc1256Ae5FF1cf2719D4937adb3bbCCab2E00A2Ca",
};

export function DepositTestSeam() {
  const { address } = useAccount();
  const WETH = useWETH();
  const [amount] = useState("10");

  const selectedAsset = {
    address: USDC_ADDRESS,
    decimals: 6,
  };

  // Convert the user-entered amount into BigInt for the transaction
  const finalAmount =
    selectedAsset?.address === WETH ? parseEther(amount) : parseUnits(amount, selectedAsset?.decimals || 18);

  const bundlerAddress = useMorphoChainAgnosticBundlerV2();

  const {
    isPending,
    errorMessage,
    sendTransactionAsync,
  } = useSeamlessSendTransaction();

  const finalizeTransaction = async () => {
    const data = encodeFunctionData({
      abi: BundlerAbi,
      functionName: "multicall",
      args: [
        [
          BundlerAction.wrapNative(finalAmount) as any,
          BundlerAction.erc4626Deposit(selectedVault.address, finalAmount, 1, address as string) as any,
        ],
      ],
    });

    // Fire off the transaction
    try {
      await sendTransactionAsync({
        to: bundlerAddress,
        data,
        // value: finalAmount,
      });
    } catch (error) {
      console.error("Failed to finalize transaction:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 justify-between items-center">
        <span className="text-[#919AAF] text-center">
          Morpho is the most efficient, secure, and flexible lending protocol on Ethereum.
        </span>
        <button onClick={finalizeTransaction} disabled={isPending}>
          {isPending ? "Sending..." : "ssss"}
        </button>
        {errorMessage && <p>Error: {errorMessage}</p>}
      </div>
    </div>
  );
}
