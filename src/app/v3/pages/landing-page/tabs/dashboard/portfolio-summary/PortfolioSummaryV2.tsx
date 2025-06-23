import { DisplayMoney, FlexCol, Typography } from "@shared";
import { useFetchFormattedUserProfitAndPortfolio } from "../../../../../../data/ilmv1-deprecated/hooks/user-profit-and-portfolio/UserProfitAndPortfolio.hook";
import { Profit } from "./Profit";
import { RewardsSelector } from "../components/claiming-rewards/RewardsSelector";
import { RewardsProvider } from "../contexts/RewardsProvider";

export const PortfolioSummaryV2 = () => {
  const { data, ...rest } = useFetchFormattedUserProfitAndPortfolio();

  return (
    <div className="">
      {/* use grid instead of flex */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left cell: will stretch to match right */}
        <div className="bg-blueGradient rounded-xl p-8 flex items-center justify-center text-center">
          <FlexCol className="gap-6">
            <div className="flex flex-col gap-3">
              <Typography type="bold5" className="text-white">
                Your total balance
              </Typography>
              <div className="w-full flex justify-center">
                <DisplayMoney {...data.portfolioValue} {...rest} typography="bold7" className="text-white" />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-10">
              <Typography type="medium4" className="text-white">
                Total unrealized gain/loss
              </Typography>
              <div className="w-full flex justify-center text-white">
                <Profit />
              </div>
            </div>
            {/* 
            <div className="flex flex-col gap-2">
              <Typography type="medium4" className="text-white">
                Total rewards claimed
              </Typography>
              <div className="w-full flex justify-center text-white">todo</div>
            </div> */}
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
