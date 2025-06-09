import { DisplayPercentage, DisplayValue, FlexCol, FlexRow, Typography, ViewNumber } from "@shared";

export interface ViewRewardToken {
  symbol: string;
  logo?: string;
  apr?: ViewNumber;
  points?: ViewNumber;
}

interface IncentivesDetailCardProps {
  assetSymbol?: string;
  totalApr?: ViewNumber;
  rewardTokens?: ViewRewardToken[];
}

export const IncentivesDetailCard: React.FC<IncentivesDetailCardProps> = ({ assetSymbol, totalApr, rewardTokens }) => {
  return (
    <FlexCol className="w-56 items-center gap-4">
      <FlexCol className="gap-2 w-full">
        {rewardTokens?.map((rewardToken, index) => {
          return (
            <FlexRow className=" justify-between" key={index}>
              <FlexRow className="items-center gap-1">
                <img src={rewardToken.logo} alt="reward-token" className="w-5 h-5" />
                <Typography type="secondary12">{rewardToken.symbol}</Typography>
              </FlexRow>
              <FlexRow>
                {rewardToken.apr && (
                  <DisplayPercentage viewValue={rewardToken.apr.viewValue} symbol={`${rewardToken.apr.symbol}`} />
                )}
                {rewardToken.points && <DisplayValue viewValue={rewardToken.points.viewValue} symbol={rewardToken.points.symbol} symbolPosition="after" />}
              </FlexRow>
            </FlexRow>
          );
        })}
      </FlexCol>

      <FlexRow className="items-center justify-between w-full mt-2">
        <Typography type="secondary16">Total</Typography>
        <FlexRow>
          <DisplayPercentage viewValue={totalApr?.viewValue} symbol="%" />
        </FlexRow>
      </FlexRow>
    </FlexCol>
  );
};
