import { DisplayMoney, FlexCol, FlexRow, Typography } from "@shared";
import { useFetchFormattedUserProfitAndPortfolio } from "../../../../../../statev3/hooks/user-profit-and-portfolio/UserProfitAndPortfolio.hook";
import { Profit } from "./Profit";
import { UnclaimedRewardsBox } from "./UnclaimedRewardsBox";

export const PortfolioSummary = () => {
  const { data, ...rest } = useFetchFormattedUserProfitAndPortfolio();

  return (
    <div>
      <div className="bg-neutral-0 shadow-card rounded-xl">
        <FlexRow className="py-8 px-10 justify-between">
          <FlexCol className="gap-8 mt-2 mb-2">
            <FlexCol className="gap-2">
              <Typography type="bold5">Your total balance</Typography>
              <DisplayMoney {...data.portfolioValue} {...rest} typography="bold7" />
            </FlexCol>
            <FlexCol className="gap-3">
              <Typography type="medium4">Total unrealized gain/loss</Typography>
              <Profit />
            </FlexCol>
          </FlexCol>
          <UnclaimedRewardsBox />
        </FlexRow>
      </div>
    </div>
  );
};
