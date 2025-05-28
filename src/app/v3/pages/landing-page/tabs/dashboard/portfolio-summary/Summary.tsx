import { DisplayMoney, FlexCol, Typography } from "@shared";
import { useFetchFormattedUserProfitAndPortfolio } from "../../../../../../statev3/hooks/user-profit-and-portfolio/UserProfitAndPortfolio.hook";
import { Profit } from "./Profit";
import { useFetchViewAllUserRewards } from "../../../../../../state/lending-borrowing/hooks/useFetchViewAllRewards";
import { RewardsSelector } from "../components/claiming-rewards/RewardsSelector";
import { RewardsProvider } from "../contexts/RewardsProvider";

export const PortfolioSummary = () => {
  const { data: rewardsData, ...restRewards } = useFetchViewAllUserRewards();
  const { data, ...rest } = useFetchFormattedUserProfitAndPortfolio();

  return (
    <div className="bg-neutral-0 shadow-card rounded-xl">
      {/* use grid instead of flex */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8">
        {/* Left cell: will stretch to match right */}
        <div className="bg-blueGradient rounded-xl p-8 flex items-center justify-center text-center">
          <FlexCol className="gap-6">
            <Typography type="bold5" className="text-white">
              Your total balance
            </Typography>
            <DisplayMoney {...data.portfolioValue} {...rest} typography="bold7" className="text-white" />
            <Typography type="medium4" className="text-white">
              Total unrealized gain/loss
            </Typography>
            <Profit />
          </FlexCol>
        </div>

        {/* Right cell */}
        <div className="flex items-center justify-center">
          <div className="w-full">
            <RewardsProvider>
              <RewardsSelector />
            </RewardsProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
