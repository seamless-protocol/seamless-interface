// src/components/LeverageTokenDetails.tsx
import React from "react";
import { LocalCollapseArrow } from "../../../../../components/details-section/DetailsCollapseArrow";
import { LocalCollapseTitle } from "../../../../../components/details-section/DetailsCollapseTitle";
import { ExternalLink, FlexCol, FlexRow, Typography } from "@shared";
import { Link } from "react-router-dom";

export const WeethEthDetails: React.FC = () => {
  return (
    <FlexCol className="w-full gap-8">
      <Typography type="bold5">Leverage Token details</Typography>

      <FlexCol className="w-full gap-4">
        {/* 1 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>How does this Leverage Token work?</LocalCollapseTitle>
          <div className="collapse-content">
            <Typography type="regular3">
              When you buy the weETH/WETH 17x Leverage Token, your weETH is used as collateral to borrow WETH via the
              Seamless WETH Vault on Base through Morpho. <br />
              <br /> This automated loop continues until a target leverage of ~17× is reached, giving you amplified
              exposure to the weETH/ETH staking-yield spread.
            </Typography>
          </div>
        </LocalCollapseArrow>

        {/* 2 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>What asset can I use to buy this Leverage Token?</LocalCollapseTitle>
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
              Ether.Fi’s liquid restaking system and accumulates rewards over time, causing its price to climb relative
              to ETH. Learn more at{" "}
              <a href="http://ether.fi" target="_blank" rel="noopener noreferrer" className="underline">
                ether.fi
              </a>
              .
            </Typography>
          </div>
        </LocalCollapseArrow>

        {/* 4 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>Do I have leveraged exposure to ETH’s price?</LocalCollapseTitle>
          <div className="collapse-content">
            <Typography type="regular3">
              No, not directly. This token gives you leveraged exposure to the yield-difference (carry) between weETH
              and ETH borrowing costs. Because these assets are highly correlated, it behaves more like a “carry trade”
              than a straight ETH long.
            </Typography>
          </div>
        </LocalCollapseArrow>

        {/* 5 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>What’s the target leverage ratio for this LT?</LocalCollapseTitle>
          <div className="collapse-content">
            <Typography type="regular3">
              The strategy targets 17x leverage, which corresponds to a collateral ratio of approximately 1.0625. It
              will stay within a range of ~16.9x (collateral ratio: 1.062893082) to ~17.3x (collateral ratio: 1.06135)
              depending on market conditions and rebalancing.
            </Typography>
          </div>
        </LocalCollapseArrow>

        {/* 6 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>What are the rebalance mechanics?</LocalCollapseTitle>
          <div className="collapse-content">
            <Typography type="regular3">
              Rebalances keep the token near its target leverage. Built-in “rebalance adapters” trigger when leverage
              drifts, liquidation nears, or on timed auctions—fully automated, no user action needed. Seamless provides
              three starter adapters:
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
              Leverage Tokens are passive smart-contract strategies—they enforce strict logic but don’t adapt to
              changing markets. Key risks include:
            </Typography>
            <ul className="list-disc list-inside mt-2 space-y-0">
              <li>Smart-contract exploits (Seamless, Morpho, Ether.Fi)</li>
              <li>Morpho lending-market risks (rate volatility, liquidation)</li>
              <li>Oracle failures (Chainlink weETH/ETH feed)</li>
              <li>Borrow-rate risk (if ETH borrow APY {">"} weETH yield)</li>
              <li>Fixed params (no manual override if conditions shift)</li>
              <li>Exit costs (DEX slippage or withdrawal delays)</li>
              <li>Amplified P/L due to high leverage</li>
            </ul>
          </div>
        </LocalCollapseArrow>

        {/* 8 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>What are the fees?</LocalCollapseTitle>
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
              It’s best for hands-off exposure to the weETH/ETH carry loop. Monitor borrow rates vs. yields to decide if
              it still fits your time horizon.
            </Typography>
          </div>
        </LocalCollapseArrow>

        {/* 10 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>Can I lose money?</LocalCollapseTitle>
          <div className="collapse-content">
            <Typography type="regular3">
              Yes. Negative yield spreads, oracle malfunctions, or exploits can trigger liquidations or losses. Always
              size positions responsibly.
            </Typography>
          </div>
        </LocalCollapseArrow>

        {/* 11 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>Where can I track performance & learn more?</LocalCollapseTitle>
          <div className="collapse-content">
            <FlexRow className="items-center gap-2">
              <ExternalLink url="https://docs.seamlessprotocol.io/leverage-tokens">GitBook</ExternalLink>
            </FlexRow>
          </div>
        </LocalCollapseArrow>
      </FlexCol>
    </FlexCol>
  );
};
