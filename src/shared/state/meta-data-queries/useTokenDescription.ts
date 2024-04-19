import { Address } from "viem";
import {
  CBETH_ADDRESS,
  DAI_ADDRESS,
  DEGEN_ADDRESS,
  SEAM_ADDRESS,
  USDBC_ADDRESS,
  USDC_ADDRESS,
  WETH_ADDRESS,
  WSTETH_ADDRESS,
} from "@meta";

export interface FullTokenData {
  description?: string;
}

interface ITokenDescriptionDict {
  [address: Address]: {
    lendingTitle: string;
    strategyTitle: string;
    description: string;
  };
}

export const TokenDescriptionDict: ITokenDescriptionDict = {
  [WETH_ADDRESS]: {
    lendingTitle: "Supply WETH",
    strategyTitle: "Multiply WETH staking rewards",
    description: "Wrapped Ethereum (WETH) allows Ethereum to be traded & used directly in smart contracts.",
  },
  [WSTETH_ADDRESS]: {
    lendingTitle: "Supply wstETH",
    strategyTitle: "Multiply wstETH staking rewards",
    description:
      "Wrapped liquid staked ETH (wstETH) is a tokenized version of staked ETH in Lido, combining the value of initial deposit plus staking rewards.",
  },
  [CBETH_ADDRESS]: {
    lendingTitle: "Supply cbETH",
    strategyTitle: "Multiply cbETH staking rewards",
    description: "Coinbase ETH (cbETH) represents Ethereum staked through Coinbase, earning interest over time.",
  },
  [USDBC_ADDRESS]: {
    lendingTitle: "Supply USDbC",
    strategyTitle: "Multiply USDbC staking rewards",
    description: "USD Base Coin (USDbC) is a stablecoin pegged to the USD, providing a stable value for transactions.",
  },
  [DAI_ADDRESS]: {
    lendingTitle: "Supply DAI",
    strategyTitle: "Multiply DAI staking rewards",
    description: "Dai is a decentralized, unbiased, collateral-backed cryptocurrency soft-pegged to the US Dollar.",
  },
  [USDC_ADDRESS]: {
    lendingTitle: "Supply USDC",
    strategyTitle: "Multiply USDC staking rewards",
    description: "USD Coin (USDC) is a digital stablecoin that is pegged to the United States dollar.",
  },
  [SEAM_ADDRESS]: {
    lendingTitle: "Supply SEAM",
    strategyTitle: "Multiply SEAM staking rewards",
    description: "SEAM is the governance token of Seamless Protocol.",
  },
  [DEGEN_ADDRESS]: {
    lendingTitle: "Supply DEGEN",
    strategyTitle: "Multiply Degen staking rewards",
    description:
      "DEGEN is dubbed as the unofficial token created for the Farcaster community, a decentralized social network.",
  },
};

export const getTokenDescription = (token: Address | undefined): string | undefined => {
  if (!token) return undefined;
  console.log("address", token);
  return TokenDescriptionDict[token]?.description;
};

export const getTokenTitle = (token: Address, isStrategy: boolean): string | undefined => {
  return isStrategy ? TokenDescriptionDict[token]?.strategyTitle : TokenDescriptionDict[token]?.lendingTitle;
};
