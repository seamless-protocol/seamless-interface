import { DisplayMoney, FlexCol, Typography } from "@shared";
import { useFetchFormattedUserProfitAndPortfolio } from "../../../../../../statev3/hooks/user-profit-and-portfolio/UserProfitAndPortfolio.hook";
import { Profit } from "./Profit";
import { UnclaimedRewardsBox } from "./UnclaimedRewardsBox";
import { MorphoUnclaimedRewardsBox } from "./morpho-vaults/rewards/MorphoUnclaimedRewardsBox";

export const PortfolioSummary = () => {
  const { data, ...rest } = useFetchFormattedUserProfitAndPortfolio();

  return (
    <div>
      <div className="bg-neutral-0 shadow-card rounded-xl">
        <div className="flex flex-row gap-4 py-8 px-10 justify-between items-start">
          {/* Your total balance section */}
          <FlexCol className="gap-8 flex-grow basis-1/4">
            <FlexCol className="gap-2">
              <Typography type="bold5">Your total balance</Typography>
              <DisplayMoney {...data.portfolioValue} {...rest} typography="bold7" />
            </FlexCol>
            <FlexCol className="gap-3">
              <Typography type="medium4">Total unrealized gain/loss</Typography>
              <div className="flex w-auto">
                <Profit />
              </div>
            </FlexCol>
          </FlexCol>

          {/* Reward boxes section */}
          <div className="flex flex-row gap-4 flex-grow basis-3/4">
            <div className="flex-grow ">
              <MorphoUnclaimedRewardsBox />
            </div>
            <div className="flex-grow">
              <UnclaimedRewardsBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
