import {
  ethLong,
  ethLong_3x,
  BRETT_ADDRESS,
  ESSEAM_ADDRESS,
  OG_POINTS_ADDRESS,
  SEAM_ADDRESS,
  USDC_ADDRESS,
  WETH_ADDRESS,
  ethShort_ADDRESS_1_5_x,
  wstETHBooster_ADDRESS,
  WSTETH_ADDRESS,
} from "@meta";
import ilmIcon from "@assets/ilms/ethLong-ilm.svg";
import wstETHIlmIcon from "@assets/ilms/wstETH-ilm.svg";
import { TagType } from "../common/types/StateTypes";
import { Address } from "viem";

import seamLogo from "@assets/logos/logo-seamless.svg";
import usdcLogo from "@assets/tokens/usdc.svg";
import ogPointsLogo from "@assets/tokens/og-points.svg";
import brettLogo from "@assets/tokens/brett.svg";
import wethLogo from "@assets/tokens/weth.svg";
import wsteth from "@assets/tokens/wsteth.svg";

export interface StrategyConfig {
  name: string;
  description: string;
  type: TagType;
}

/* ------------- */
/*   Config      */
/* ------------- */
export const strategyConfig: { [key: Address]: StrategyConfig } = {
  [wstETHBooster_ADDRESS]: {
    name: "wstETH Leveraged Staking 3x",
    description: "Increase ETH staking rewards by magnifying a wstETH position.",
    type: "Staking",
  },
  [ethLong]: {
    name: "ETH Long 1.5x",
    description: "For ETH Bulls, increase ETH price exposure by 1.5 times long.",
    type: "Long",
  },
  [ethLong_3x]: {
    name: "ETH Long 3x",
    description: "For ETH Bulls, increase ETH price exposure by 3 times long.",
    type: "Long",
  },
  [ethShort_ADDRESS_1_5_x]: {
    name: "ETH Short 1.5x",
    description: "For ETH Bears, increase ETH price exposure by 1.5 times short.",
    type: "Short",
  },
};

/* --------- */
/*   Icons   */
/* --------- */
export const addressIconMap: Map<string, string> = new Map([
  [SEAM_ADDRESS, seamLogo],
  [ESSEAM_ADDRESS, seamLogo],
  [OG_POINTS_ADDRESS, ogPointsLogo],
  [USDC_ADDRESS, usdcLogo],
  [BRETT_ADDRESS, brettLogo],
  [WETH_ADDRESS, wethLogo],
  [wstETHBooster_ADDRESS, wstETHIlmIcon],
  [ethLong, ilmIcon],
  [ethLong_3x, ilmIcon],
  [ethShort_ADDRESS_1_5_x, ilmIcon],
  [WSTETH_ADDRESS, wsteth],
]);

/* -------------------- */
/*   Strategy details   */
/* -------------------- */
const RiskSharedAnswer = (
  <>
    <strong>Smart Contract Risk</strong>: The Service utilizes smart contracts on blockchain platforms. These contracts
    are subject to potential bugs, vulnerabilities, or exploits. While efforts are made to ensure the security of these
    contracts, there is no guarantee that they are free from flaws or will function as intended.
    <br /> <strong>Liquidity Risk</strong>: DeFi assets may have limited liquidity. This may make it difficult to buy or
    sell assets without impacting their price.
  </>
);

const FeesSharedAnswer = (
  <>
    Seamless does not have any fees associated with this strategy. But note there are costs to maintaining this
    strategy. Cost source are: DEX fees and slippage incurred during rebalances and interest incurred from borrowing.
  </>
);

export const strategyDetails = {
  [wstETHBooster_ADDRESS]: {
    Lavarage_Exposure: (
      <>
        No. Since wstETH and ETH are correlated assets, regardless of ETH price movement, you earn staking fees from
        holding a larger wstETH balance.
      </>
    ),
    MainRisks: <>{RiskSharedAnswer}</>,
    StrategyFees: <>{FeesSharedAnswer}</>,
  },
  [ethLong]: {
    Lavarage_Exposure: (
      <>
        Yes. As ETH increases in price, returns are magnified in bullish market conditions. Conversely, losses are
        magnified when ETH decreases.
      </>
    ),
    MainRisks: RiskSharedAnswer,
    StrategyFees: FeesSharedAnswer,
  },
  [ethLong_3x]: {
    Lavarage_Exposure: (
      <>
        Yes. As ETH increases in price, returns are magnified in bullish market conditions. Conversely, losses are
        magnified when ETH decreases.
      </>
    ),
    MainRisks: RiskSharedAnswer,
    StrategyFees: FeesSharedAnswer,
  },
  [ethShort_ADDRESS_1_5_x]: {
    Lavarage_Exposure: (
      <>
        Yes. As ETH decreases in price in bearish market conditions, returns are magnified. Conversely, losses are
        magnified when ETH increases.
      </>
    ),
    MainRisks: RiskSharedAnswer,
    StrategyFees: FeesSharedAnswer,
  },
};
