import React from 'react'
// import { BundlerAction } from "@morpho-org/morpho-blue-bundlers";
// import { BundlerAction } from "@morpho-org/morpho-blue-bundlers";


export const DepositTest = () => {
  const vaultAddress = "0xABCD...";
  const assets = 1000000000000000000n; // 1 token
  const minShares = 900000000000000000n; // 0.9 shares
  const receiver = "0xEFGH...";

  const depositAction = BundlerAction.erc4626Deposit(
    vaultAddress,
    assets,
    minShares,
    receiver
  );



  return (
    <div>DepositTest</div>
  )
}
