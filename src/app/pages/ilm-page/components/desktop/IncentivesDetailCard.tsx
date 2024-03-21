import {
  DisplayPercentage,
  FlexCol,
  FlexRow,
  Typography,
  ViewNumber,
} from "../../../../../shared";
import { ViewRewardToken } from "../../hooks/useFetchViewBaseAsset";

interface IncentivesDetailCardProps {
  totalApr?: ViewNumber;
  rewardTokens?: ViewRewardToken[];
}

export const IncentivesDetailCard: React.FC<IncentivesDetailCardProps> = ({
  totalApr,
  rewardTokens,
}) => {
  return (
    <FlexCol className="w-56 items-center gap-4">
      <Typography type="caption" className="text-left">
        Participating in this ETH reserve gives annualized rewards. APY refers
        solely to the annualized rate of earning reward tokens for your
        participation in the Seamless ecosystem.
      </Typography>

      <FlexCol className="gap-2 w-full">
        {rewardTokens?.map((rewardToken, index) => {
          return (
            <FlexRow className=" justify-between">
              <FlexRow key={index} className="items-center gap-1">
                <img src={rewardToken.logo} className="w-5 h-5" />
                <Typography type="secondary12">{rewardToken.symbol}</Typography>
              </FlexRow>
              <FlexRow>
                <DisplayPercentage
                  viewValue={rewardToken.apr.viewValue}
                  symbol={rewardToken.apr.symbol + " APR"}
                />
              </FlexRow>
            </FlexRow>
          );
        })}
      </FlexCol>

      <FlexRow className="items-center justify-between w-full mt-2">
        <Typography type="secondary16">Net APR</Typography>
        <FlexRow>
          <DisplayPercentage viewValue={totalApr?.viewValue} symbol="%  APR" />
        </FlexRow>
      </FlexRow>
    </FlexCol>
  );
};
