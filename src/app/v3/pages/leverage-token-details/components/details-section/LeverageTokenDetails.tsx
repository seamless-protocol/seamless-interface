import { Address } from "viem";
import { WeethEthDetails } from "./leverage-token-details-per-vault/WeethEthDetails";

export interface LeverageTokenDetailsProps {
  tokenAddress?: Address;
}

export const LeverageTokenDetails = ({ tokenAddress }: LeverageTokenDetailsProps) => {
  return <WeethEthDetails tokenAddress={tokenAddress} />;
};
