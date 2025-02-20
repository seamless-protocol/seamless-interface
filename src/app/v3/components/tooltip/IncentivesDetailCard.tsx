import { DisplayPercentage, FlexCol, FlexRow, Typography, ViewNumber } from "@shared";

export interface ViewRewardToken {
  symbol: string;
  logo?: string;
  apr: ViewNumber;
}

interface IncentivesDetailCardProps {
  assetSymbol?: string;
  totalApr?: ViewNumber;
  rewardTokens?: ViewRewardToken[];
}

export const IncentivesDetailCard: React.FC<IncentivesDetailCardProps> = ({ assetSymbol, totalApr, rewardTokens }) => {
  return (
    <FlexCol className="w-56 items-center gap-4">
      <Typography type="caption" className="text-left">
        Participating in this {assetSymbol || ""} reserve gives annualized rewards. APR refers solely to the annualized
        rate of earning reward tokens for your participation in the Seamless ecosystem.
      </Typography>

      <FlexCol className="gap-2 w-full">
        {rewardTokens?.map((rewardToken, index) => {
          return (
            <FlexRow className=" justify-between" key={index}>
              <FlexRow className="items-center gap-1">
                <img src={rewardToken.logo} alt="reward-token" className="w-5 h-5" />
                <Typography type="secondary12">{rewardToken.symbol}</Typography>
              </FlexRow>
              <FlexRow>
                <DisplayPercentage viewValue={rewardToken.apr.viewValue} symbol={`${rewardToken.apr.symbol} APR`} />
              </FlexRow>
            </FlexRow>
          );
        })}
      </FlexCol>

      <FlexRow className="items-center justify-between w-full mt-2">
        <Typography type="secondary16">Total</Typography>
        <FlexRow>
          <DisplayPercentage viewValue={totalApr?.viewValue} symbol="%  APR" />
        </FlexRow>
      </FlexRow>
    </FlexCol>
  );
};
