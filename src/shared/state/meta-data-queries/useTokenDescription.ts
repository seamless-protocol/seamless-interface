import { Address } from "viem";
import {
  CBETH_ADDRESS,
  DAI_ADDRESS,
  USDBC_ADDRESS,
  USDC_ADDRESS,
  WETH_ADDRESS,
  WSTETH_ADDRESS,
  rwstETH_ADDRESS,
  sWETH_ADDRESS,
  wstETHBooster_ADDRESS,
} from "@meta";

export interface FullTokenData {
  description?: string;
}

interface ITokenDescriptionDict {
  [address: Address]: {
    description: string;
  };
}

export const TokenDescriptionDict: ITokenDescriptionDict = {
  [WETH_ADDRESS]: {
    description: "Wrapped Ethereum (WETH) allows Ethereum to be traded & used directly in smart contracts.",
  },
  [sWETH_ADDRESS]: {
    description:
      "Staked Wrapped Ethereum (sWETH) represents staked ETH in a liquid form, allowing for easy integration into DeFi applications.",
  },
  [WSTETH_ADDRESS]: {
    description:
      "Wrapped liquid staked ETH (wstETH) is a tokenized version of staked ETH in Lido, combining the value of initial deposit plus staking rewards.",
  },
  [wstETHBooster_ADDRESS]: {
    description:
      "This integrated Liquidity Market (ILM) uses wstETH deposits to borrow ETH, which is used to purchase more wstETH to achieve the targeted multiple. This amplifies the participant's wstETH and ETH staking reward exposure.",
  },
  [CBETH_ADDRESS]: {
    description:
      "Compound Wrapped ETH (cBETH) represents Ethereum staked in the Compound protocol, earning interest over time.",
  },
  [USDBC_ADDRESS]: {
    description:
      "USD Binance Coin (USDBC) is a stablecoin pegged to the USD, providing a stable value for transactions.",
  },
  [DAI_ADDRESS]: {
    description: "Dai is a decentralized, unbiased, collateral-backed cryptocurrency soft-pegged to the US Dollar.",
  },
  [USDC_ADDRESS]: {
    description: "USD Coin (USDC) is a digital stablecoin that is pegged to the United States dollar.",
  },
  [rwstETH_ADDRESS]: {
    description:
      "Rewrapped stETH (rwstETH) provides a secondary layer of liquidity for staked ETH, facilitating easier transactions and integrations.",
  },
};

export const useTokenDescription = (token: Address): string => {
  return TokenDescriptionDict[token]?.description;
};
