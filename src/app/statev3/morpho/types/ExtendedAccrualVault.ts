import { AccrualVault } from "@morpho-org/blue-sdk";
import { Token } from "@shared";

export interface ExtendedAccrualVault extends AccrualVault {
  collateralTokenData: Map<string, Token>;
  loanTokenData: Map<string, Token>;
  underlyingTokenData: Token;
}
