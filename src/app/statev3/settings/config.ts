import {
  ethLong,
  ethLong_3x,
  ethShort_ADDRESS_1_5_x,
  USDC_ADDRESS,
  WETH_ADDRESS,
  WSTETH_ADDRESS,
  wstETHBooster_ADDRESS,
} from "../../../meta";
import ilmIcon from "@assets/ilms/ethLong-ilm.svg";
import { TagType } from "../common/types/StateTypes";
import { Address } from "viem";
import { assetsConfig } from "../../state/settings/config";
import { LendMarketConfig } from "../../state/settings/configTypes";

export interface StrategyConfig {
  name: string;
  description: string;
  type: TagType;
  icon: string;
  underlyingAsset: LendMarketConfig;
  debtAsset: LendMarketConfig;
  address?: Address;
}

export const strategyConfig: { [key: Address]: StrategyConfig } = {
  [wstETHBooster_ADDRESS]: {
    name: "wstETH Leveraged Staking 3x",
    description: "Increase ETH staking rewards by magnifying a wstETH position.",
    type: "Staking",
    icon: ilmIcon,
    underlyingAsset: assetsConfig[WSTETH_ADDRESS],
    debtAsset: assetsConfig[WETH_ADDRESS],
    address: wstETHBooster_ADDRESS,
  },
  [ethLong]: {
    name: "ETH Long 1.5x",
    description: "For ETH Bulls, increase ETH price exposure by 1.5 times long.",
    type: "Long",
    icon: ilmIcon,
    underlyingAsset: assetsConfig[WETH_ADDRESS],
    debtAsset: assetsConfig[USDC_ADDRESS],
    address: ethLong,
  },
  [ethLong_3x]: {
    name: "ETH Long 3x",
    description: "For ETH Bulls, increase ETH price exposure by 3 times long.",
    type: "Long",
    icon: ilmIcon,
    underlyingAsset: assetsConfig[WETH_ADDRESS],
    debtAsset: assetsConfig[USDC_ADDRESS],
    address: ethLong_3x,
  },
  [ethShort_ADDRESS_1_5_x]: {
    name: "ETH Short 3x",
    description: "For ETH Bears, increase ETH price exposure by 3 times short.",
    type: "Short",
    icon: ilmIcon,
    underlyingAsset: assetsConfig[USDC_ADDRESS],
    debtAsset: assetsConfig[WETH_ADDRESS],
    address: ethShort_ADDRESS_1_5_x,
  },
};
