import { Address } from "viem";
import { CBETH_ADDRESS, DAI_ADDRESS, USDBC_ADDRESS, USDC_ADDRESS, WETH_ADDRESS, WSTETH_ADDRESS } from "@meta";

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
};

export const useTokenDescription = (token: Address): string => {
  return TokenDescriptionDict[token]?.description;
};

export const useTokenTitle = (token: Address, isStrategy: boolean): string => {
  return isStrategy ? TokenDescriptionDict[token].strategyTitle : TokenDescriptionDict[token].lendingTitle;
};
