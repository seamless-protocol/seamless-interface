"use client";

import { BundlerAction } from "@morpho-org/morpho-blue-bundlers/pkg";
import { encodeFunctionData, parseUnits } from "viem";
import { useAccount, useSendTransaction } from "wagmi";
import { useMorphoChainAgnosticBundlerV2 } from "./useMorphoChainAgnosticBundlerV2";
import { BundlerAbi } from "./BundlerAbi";
import { useState } from "react";
import { USDC_ADDRESS } from "../../../../../meta";
import { useERC20Approve } from "../../../../../shared";

// NEW import

const selectedVault = {
  address: "0xc1256Ae5FF1cf2719D4937adb3bbCCab2E00A2Ca",
  // address: "0xa0E430870c4604CcfC7B38Ca7845B1FF653D0ff1",
};

export function DepositTest() {
  const { address } = useAccount();
  const [amount] = useState("10");

  const selectedAsset = {
    address: USDC_ADDRESS,
    decimals: 6,
  };

  // Convert the user-entered amount into BigInt for the transaction
  const finalAmount = parseUnits(amount, selectedAsset?.decimals || 18);

  const bundlerAddress = useMorphoChainAgnosticBundlerV2();

  const { sendTransactionAsync, isPending, error: errorMessage } = useSendTransaction();
  const { approveAsync, isApproved } = useERC20Approve(selectedAsset?.address, bundlerAddress, finalAmount);

  const finalizeTransaction = async () => {
    const data = encodeFunctionData({
      abi: BundlerAbi,
      functionName: "multicall",
      args: [
        [
          // BundlerAction.wrapNative(finalAmount) as any,
          BundlerAction.erc20TransferFrom(selectedAsset?.address, finalAmount),
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
        <button onClick={approveAsync} disabled={isApproved}>
          {isApproved ? "Approved" : "Approve"}
        </button>
        {errorMessage && <p>Error: {errorMessage?.message}</p>}
      </div>
    </div>
  );
}
