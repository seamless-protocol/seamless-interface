import {
  WSTETH_ADDRESS,
  WETH_ADDRESS,
  USDC_ADDRESS,
  ethLong,
  ethLong_3x,
  wstETHBooster_ADDRESS_3_x,
} from "@meta";
import wstEthLogo from "@assets/tokens/wsteth.svg";
import usdcLogo from "@assets/tokens/usdc.svg";
import wethLogo from "@assets/tokens/weth.svg";
import ethLongIlm from "@assets/ilms/ethLong-ilm.svg";
import wstETHIlm from "@assets/ilms/wstETH-ilm.svg";

import { Address } from "viem";
import { LendMarketConfig, StrategyConfig } from "./configTypes";

export const assetsConfig: { [key: Address]: LendMarketConfig } = {
  [WETH_ADDRESS]: {
    name: "Wrapped Ethereum",
    address: WETH_ADDRESS,
    logo: wethLogo,
  },
  [USDC_ADDRESS]: {
    name: "USD Coin",
    address: USDC_ADDRESS,
    logo: usdcLogo,
  },
  [WSTETH_ADDRESS]: {
    name: "Wrapped liquid Staked Ether 2.0",
    address: WSTETH_ADDRESS,
    logo: wstEthLogo,
  },
};

export const strategiesConfig: { [key: Address]: StrategyConfig } = {
  [wstETHBooster_ADDRESS_3_x]: {
    name: "wstETH Leveraged Staking 3x",
    description: "Increase ETH staking rewards by magnifying a wstETH position.",
    address: wstETHBooster_ADDRESS_3_x,
    logo: wstETHIlm,
    underlyingAsset: assetsConfig[WSTETH_ADDRESS],
    debtAsset: assetsConfig[WETH_ADDRESS],
    tags: ["Staking"],
  },
  [ethLong]: {
    name: "ETH Long 1.5x",
    description: "For ETH Bulls, increase ETH price exposure by 1.5 times long.",
    address: ethLong,
    logo: ethLongIlm,
    underlyingAsset: assetsConfig[WETH_ADDRESS],
    debtAsset: assetsConfig[USDC_ADDRESS],
    tags: ["Long"],
  },
  [ethLong_3x]: {
    name: "ETH Long 3x",
    description: "For ETH Bulls, increase ETH price exposure by 3 times long.",
    address: ethLong_3x,
    logo: ethLongIlm,
    underlyingAsset: assetsConfig[WETH_ADDRESS],
    debtAsset: assetsConfig[USDC_ADDRESS],
    tags: ["Long"],
  },
};
