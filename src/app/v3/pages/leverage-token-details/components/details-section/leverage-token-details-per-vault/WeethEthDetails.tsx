// src/components/LeverageTokenDetails.tsx
import React from "react";
import { LocalCollapseArrow } from "../../../../../components/details-section/DetailsCollapseArrow";
import { LocalCollapseTitle } from "../../../../../components/details-section/DetailsCollapseTitle";
import { ExternalLink, FlexCol, FlexRow, Typography } from "@shared";
import { Link } from "react-router-dom";
import { Address } from "viem";

export interface WeethEthDetailsProps {
  tokenAddress?: Address;
}

export const WeethEthDetails: React.FC<WeethEthDetailsProps> = ({ tokenAddress }) => {
  return (
    <FlexCol className="w-full gap-8">
      <Typography type="bold5">Leverage Token FAQ</Typography>

      <FlexCol className="w-full gap-4">
        {/* 1 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>How does this Leverage Token work?</LocalCollapseTitle>
          <div className="collapse-content">
            <Typography type="regular3">
              When you mint the weETH / WETH 17x Leverage Token, your weETH is used as collateral to borrow WETH, using the
              Seamless WETH Vault on Base via Morpho. <br />
              <br /> This automated process continues until a target leverage of ~17× is reached, giving you amplified
              exposure to the weETH / ETH staking-yield spread.
            </Typography>
          </div>
        </LocalCollapseArrow>

        {/* 2 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>What asset can I use to mint this Leverage Token?</LocalCollapseTitle>
          <div className="collapse-content">
            <Typography type="regular3">Only weETH is accepted to mint this Leverage Token.</Typography>
          </div>
        </LocalCollapseArrow>

        {/* 3 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>What is weETH?</LocalCollapseTitle>
          <div className="collapse-content">
            <Typography type="regular3">
              weETH is Ether.Fi&apos;s wrapped, non-rebasing version of eETH. It represents ETH staked through
              Ether.Fi’s liquid restaking system and accumulates staking rewards over time, making its price increase
              relative to ETH as more rewards accrue. Learn more at{" "}
              <a href="http://ether.fi" target="_blank" rel="noopener noreferrer" className="underline">
                ether.fi
              </a>
              .
            </Typography>
          </div>
        </LocalCollapseArrow>

        {/* 4 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>Do I have leveraged exposure to ETH’s price with this Leverage Token?</LocalCollapseTitle>
          <div className="collapse-content">
            <Typography type="regular3">
              No, not directly. The Leverage Token gives you leveraged exposure to the difference between the yield on weETH
              and the borrowing cost of ETH. Since weETH and ETH are highly correlated, the strategy behaves similarly to a
              yield farming or carry trade strategy rather than a directional ETH bet.
            </Typography>
          </div>
        </LocalCollapseArrow>

        {/* 5 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>What’s the target leverage ratio for this Leverage Token?</LocalCollapseTitle>
          <div className="collapse-content">
            <Typography type="regular3">
            The strategy targets 17x leverage, which corresponds to a collateral ratio of approximately 1.0625. It will stay
            within a range of ~16.9x (collateral ratio: 1.062893082) to ~17.3x (collateral ratio: 1.06135) depending on market
            conditions and rebalancing.
            </Typography>
          </div>
        </LocalCollapseArrow>

        {/* 6 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>What are the rebalance mechanics for Leverage Tokens?</LocalCollapseTitle>
          <div className="collapse-content">
            <Typography type="regular3">
            Rebalancing helps the Leverage Token maintain its target leverage. Each token has built-in rules (called “rebalancing adapters”)
            that tell it when and how to adjust the position. For example, it might rebalance when leverage drifts too far from target, when
            it&apos;s close to liquidation, or through timed auctions. Everything happens automatically - no manual steps are needed by the user.
            <br /> <br />
            Seamless contributors have created 3 types of rebalance adapters as a starting point:
            </Typography>
            <ul className="list-disc list-inside mt-2 space-y-0">
              <li>
                <Link
                  to="https://github.com/seamless-protocol/leverage-tokens/blob/main/src/rebalance/CollateralRatiosRebalanceAdapter.sol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  CollateralRatiosRebalanceAdapter
                </Link>
              </li>
              <li>
                <Link
                  to="https://github.com/seamless-protocol/leverage-tokens/blob/main/src/rebalance/DutchAuctionRebalanceAdapter.sol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  DutchAuctionRebalanceAdapter
                </Link>
              </li>
              <li>
                <Link
                  to="https://github.com/seamless-protocol/leverage-tokens/blob/main/src/rebalance/PreLiquidationRebalanceAdapter.sol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  PreLiquidationRebalanceAdapter
                </Link>
              </li>
            </ul>
          </div>
        </LocalCollapseArrow>

        {/* 7 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>What are the risks involved?</LocalCollapseTitle>
          <div className="collapse-content">
            <Typography type="regular3">
            Leverage Tokens (LTs) are decentralized and permissionless. They operate like a passive strategy - smart contracts that follow strict
            logic to maintain a target leverage using assets on DeFi lending markets like Morpho. These contracts enforce rules but do not actively
            manage risk or adjust based on changing market conditions. As such, performance depends entirely on market dynamics, and profitability
            is not guaranteed.
            <br /> <br />
            Here are some key risks to be aware of/consider:
            </Typography>
            <ul className="list-disc list-inside mt-2 space-y-0">
              <li>
                <b>Smart Contract Risk (Seamless, Morpho, Ether.Fi)</b>: The strategy depends on multiple smart contracts that could contain bugs or be exploited.
              </li>
              <li>
                <b>Lending Market Risk (Morpho)</b>: Includes volatility in borrow rates, liquidation risk, and integration dependencies with Chainlink oracles.
              </li>
              <li>
                <b>Oracle Risk</b>: The weETH/ETH exchange rate is sourced from a Chainlink oracle. If this feed is delayed, incorrect, or manipulated, it could
                lead to mispriced rebalances or liquidation.
              </li>
              <li>
                <b>Borrow Rate Risk</b>: If the ETH borrow rate exceeds the yield earned by weETH (e.g., borrowing at 10% APY while earning 2.3% APY), the position
                becomes unprofitable. At 17x leverage, liquidation could occur within ~19 days under these conditions.
              </li>
              <li>
                <b>Immutability</b>: Leverage Token parameters are fixed. If market conditions shift unfavorably, the token will continue executing its programmed logic.
                Users must actively monitor and exit if the strategy no longer serves their goals.
              </li>
              <li>
                <b>Exit Risk</b>: Exiting a position may require converting weETH to ETH, which can involve DEX slippage or protocol withdrawal costs.
              </li>
              <li>
                <b>Inherent Leverage Risk</b>: Gains and losses are magnified. Leverage amplifies outcomes - both positive and negative - so careful position sizing
                and monitoring are essential.
              </li>
            </ul>
          </div>
        </LocalCollapseArrow>

        {/* 8 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>What are the fees with this Leverage Token?</LocalCollapseTitle>
          <div className="collapse-content">
            <ul className="list-disc list-inside mt-2 space-y-0">
              <li>
                <strong>Minting Fee:</strong> 0%
              </li>
              <li>
                <strong>Redemption Fee:</strong> 0.1%
              </li>
              <li>
                <strong>Other Costs:</strong> Rebalancing may incur DEX fees or slippage. ETH borrowing costs can
                fluctuate and reduce net returns.
              </li>
              <li>
                <strong>Note:</strong> Fees accrued go back into the LT. This means users holding the LT benefit from
                the fees paid by users redeeming.
              </li>
            </ul>
          </div>
        </LocalCollapseArrow>

        {/* 9 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>Is this a short-term or long-term strategy?</LocalCollapseTitle>
          <div className="collapse-content">
            <Typography type="regular3">
            It depends on your goals. The Leverage Token passively maintains leverage and is best suited for users who want automated exposure to a yield loop
            between weETH and ETH. You should monitor borrow rates and yields regularly to decide if it still fits your strategy.
            </Typography>
          </div>
        </LocalCollapseArrow>

        {/* 10 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>Can I lose money with this Leverage Token?</LocalCollapseTitle>
          <div className="collapse-content">
            <Typography type="regular3">
            Yes. Although the strategy is designed to earn a yield by leveraging weETH against ETH, negative yield spreads (e.g. if ETH borrow rate {">"} weETH yield)
            can erode value. In extreme scenarios like oracle malfunction or protocol exploit, liquidation or capital loss is possible.
            </Typography>
          </div>
        </LocalCollapseArrow>

        {/* 11 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>Where can I learn more?</LocalCollapseTitle>
          <div className="collapse-content">
            <FlexRow className="items-center gap-2">
              <ExternalLink url={`https://basescan.org/address/${tokenAddress}`}>Leverage Token Contract</ExternalLink>
            </FlexRow>
            <FlexRow className="items-center gap-2">
              <ExternalLink url="https://docs.seamlessprotocol.com/">GitBook</ExternalLink>
            </FlexRow>
          </div>
        </LocalCollapseArrow>
      </FlexCol>
    </FlexCol>
  );
};
