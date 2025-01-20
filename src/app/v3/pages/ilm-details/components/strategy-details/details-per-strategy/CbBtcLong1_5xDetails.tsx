import React from "react";
import { FlexCol, Typography } from "@shared";
import { HowStrategyWorks } from "../HowStrategyWorks";
import { LearnMore } from "../LearnMore";
import { Address } from "viem";
import { FeesSharedAnswer } from "../common/FeesSharedAnswer";
import { RiskSharedAnswer } from "../common/RiskSharedAnswer";
import { LocalCollapseArrow } from "../../../../../components/details-section/DetailsCollapseArrow";
import { LocalCollapseTitle } from "../../../../../components/details-section/DetailsCollapseTitle";

export const CbBtcLong1_5xDetails: React.FC<{
  strategy: Address;
}> = ({ strategy }) => {
  return (
    <FlexCol className="w-full gap-8">
      <Typography type="bold5">Strategy details</Typography>
      <FlexCol className="w-full gap-4">
        <LocalCollapseArrow>
          <LocalCollapseTitle>How this strategy works</LocalCollapseTitle>
          <div className="collapse-content">
            <HowStrategyWorks strategy={strategy} />
          </div>
        </LocalCollapseArrow>

        <LocalCollapseArrow>
          <LocalCollapseTitle>Do I have leverage exposure to cbBTC price with this ILM?</LocalCollapseTitle>
          <div className="collapse-content">
            <div>
              <Typography type="regular3">
                {" "}
                Yes. As cbBTC increase in price, returns are magnified in bullish market conditions. Conversely, losses
                are magnified when cbBTC decreases.
              </Typography>
            </div>
          </div>
        </LocalCollapseArrow>

        <LocalCollapseArrow>
          <LocalCollapseTitle>What are the main risks?</LocalCollapseTitle>
          <div className="collapse-content">
            <div>
              <Typography type="regular3">
                <RiskSharedAnswer />
              </Typography>
            </div>
          </div>
        </LocalCollapseArrow>

        <LocalCollapseArrow>
          <LocalCollapseTitle>What fees are there for using this strategy?</LocalCollapseTitle>
          <div className="collapse-content">
            <div>
              <Typography type="regular3">
                <FeesSharedAnswer />
              </Typography>
            </div>
          </div>
        </LocalCollapseArrow>
        <LocalCollapseArrow>
          <LocalCollapseTitle>Where can I learn more?</LocalCollapseTitle>
          <div className="collapse-content">
            <LearnMore strategy={strategy} />
          </div>
        </LocalCollapseArrow>
      </FlexCol>
    </FlexCol>
  );
};
