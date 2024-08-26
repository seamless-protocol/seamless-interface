import { ethLong, ethLong_3x, ethShort_ADDRESS_1_5_x, wstETHBooster_ADDRESS } from "../../../meta";
import ilmIcon from "@assets/ilms/ethLong-ilm.svg";
import { TagType } from "../common/types/StateTypes";
import { Address } from "viem";

interface StrategyConfig {
  name: string;
  description: string;
  type: TagType;
  icon: string;
}

export const strategyConfig: { [key: Address]: StrategyConfig } = {
  [wstETHBooster_ADDRESS]: {
    name: "wstETH Leveraged Staking 3x",
    description: "Increase ETH staking rewards by magnifying a wstETH position.",
    type: "Staking",
    icon: ilmIcon,
  },
  [ethLong]: {
    name: "ETH Long 1.5x",
    description: "For ETH Bulls, increase ETH price exposure by 1.5 times long.",
    type: "Long",
    icon: ilmIcon,
  },
  [ethLong_3x]: {
    name: "ETH Long 3x",
    description: "For ETH Bulls, increase ETH price exposure by 3 times long.",
    type: "Long",
    icon: ilmIcon,
  },
  [ethShort_ADDRESS_1_5_x]: {
    name: "ETH Short 3x",
    description: "For ETH Bears, increase ETH price exposure by 3 times short.",
    type: "Short",
    icon: ilmIcon,
  },
};
