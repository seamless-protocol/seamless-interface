import React from "react";
import { ExternalLink, FlexCol, FlexRow, Typography } from "@shared";
import { LocalCollapseArrow } from "../../../../../components/details-section/DetailsCollapseArrow";
import { LocalCollapseTitle } from "../../../../../components/details-section/DetailsCollapseTitle";

export const StakingDetails: React.FC = () => {
  return (
    <FlexCol className="w-full gap-8">
      <Typography type="bold5">Staking details</Typography>
      <FlexCol className="w-full gap-4">
        {/* QUESTION 1 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>What are the benefits of staking?</LocalCollapseTitle>
          <div className="collapse-content">
            <div>
              <Typography type="regular3">
                By staking SEAM, you are contributing to the security of Seamless Protocol and accruing rewards from
                protocol fees (100% of protocol fees are directed to stakers). Currently, the assets included in
                protocol fee capture are smcbBTC, smETH and smUSDC, this list may change overtime. Additionally, stakers
                accrue any SEAM or esSEAM rewards DAO governance votes to emit to stakers.
              </Typography>
            </div>
          </div>
        </LocalCollapseArrow>

        {/* QUESTION 2 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>By staking, how much protocol fees/rewards can I expect?</LocalCollapseTitle>
          <div className="collapse-content">
            <div>
              <Typography type="regular3">
                Rewards/fees are distributed in-kind (in the asset the fee was accrued). For example, Seamless Protocol
                fees earned from vaults on Morpho are denominated in the vault LP token itself (which continue to earn
                yield). Upon claiming, these LP tokens will be added to your wallet and will show up as balances on the
                Seamless Dashboard Tab. From there, you can choose to either keep these positions deposited (yielding)
                or withdraw fully.
              </Typography>
            </div>
          </div>
        </LocalCollapseArrow>

        {/* QUESTION 3 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>How often can I claim staking rewards?</LocalCollapseTitle>
          <div className="collapse-content">
            <div>
              <Typography type="regular3">
                Rewards from Seamless Protocol fees will be claimable block by block. You can routinely check and claim
                your staking rewards directly in the Seamless App.
              </Typography>
            </div>
          </div>
        </LocalCollapseArrow>

        {/* QUESTION 4 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>How do I unstake SEAM?</LocalCollapseTitle>
          <div className="collapse-content">
            <div>
              <Typography type="regular3">
                Once SEAM has been staked, users can initiate the unstaking of SEAM at any time. Unstaking is a two step
                process:
                <br />
                Step 1: Initiate your unstaking 7-day cooldown period, and wait the 7 days.
                <br />
                Step 2: After the 7 day cooldown expires, you can unstake your SEAM within a 24 hour window
              </Typography>
            </div>
          </div>
        </LocalCollapseArrow>

        {/* QUESTION 5 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>What happens after the 7-day cooldown expires?</LocalCollapseTitle>
          <div className="collapse-content">
            <div>
              <Typography type="regular3">
                After the cooldown finishes, you will have a 24-hour window to actually unstake.
                <br />
                Note: If you do not complete the unstake within those 24 hours, the 7 day cooldown resets and you will
                need to initiate it again.
              </Typography>
            </div>
          </div>
        </LocalCollapseArrow>

        {/* QUESTION 6 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>
            Do I continue to earn staking rewards during the unstake cooldown period?
          </LocalCollapseTitle>
          <div className="collapse-content">
            <div>
              <Typography type="regular3">Yes.</Typography>
            </div>
          </div>
        </LocalCollapseArrow>

        {/* QUESTION 7 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>Why is there a cooldown period and unstaking windows?</LocalCollapseTitle>
          <div className="collapse-content">
            <div>
              <Typography type="regular3">
                Consistent with the slashing FAQ below, If there was any hack/exploit against the protocol, staked funds
                act as a first line of defense to recoup any losses. Since the Seamless Safety Module would need to
                access staked fund in this event, there are more rigid unstake and cooldown periods to ensure there is
                adequate liquidity and fairness in the system for those who choose to stake.
              </Typography>
            </div>
          </div>
        </LocalCollapseArrow>

        {/* QUESTION 8 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>What does it mean to be “slashed”?</LocalCollapseTitle>
          <div className="collapse-content">
            <div>
              <Typography type="regular3">
                When you stake SEAM, a portion of your funds can be used to cover protocol losses during a
                &quot;catastrophic&quot; event (such as a hack/exploit). Funds staked within the Staking Safety Module
                could be utilized at the discretion of Seamless governance (i.e. dependent on community discussions and
                voting). This mechanism is called slashing. While it&apos;s a rare event, it&apos;s important to
                understand that by staking, you are taking on some protocol risk.
              </Typography>
            </div>
          </div>
        </LocalCollapseArrow>

        {/* QUESTION 9 */}
        <LocalCollapseArrow>
          <LocalCollapseTitle>Where can I learn more?</LocalCollapseTitle>
          <div className="collapse-content">
            <div>
              <FlexRow className="items-center gap-2">
                <ExternalLink url="gitBookUrl">GitBook</ExternalLink>
              </FlexRow>
            </div>
          </div>
        </LocalCollapseArrow>
      </FlexCol>
    </FlexCol>
  );
};
