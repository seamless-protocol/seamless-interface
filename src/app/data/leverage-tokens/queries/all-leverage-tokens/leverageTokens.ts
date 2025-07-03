import { Token, ViewBigIntWithUsdValue } from "@shared";
import { Address } from "viem";

export interface LeverageToken {
  address: Address;
  tvl?: ViewBigIntWithUsdValue;
  additionalData: {
    description: string;
  };
  tokenData?: Token;
  collateralAssetTokenData?: Token;
  debtAssetTokenData?: Token;
  limitsConfig: {
    maxBorrowApy: number; // %
    maxDeposit: number;
  };
}

export const leverageTokensConfig: LeverageToken[] = [
  {
    address: "0xA2fceEAe99d2cAeEe978DA27bE2d95b0381dBB8c" as Address,
    additionalData: {
      description: "Ether.Fi weETH Yield Loop",
    },
    limitsConfig: {
      maxBorrowApy: 2.8,
      maxDeposit: 125,
    },
  },
];
