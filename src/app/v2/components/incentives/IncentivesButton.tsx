import { DisplayPercentage, FlexRow, Tooltip, Icon, ViewNumber } from "@shared";
import { ViewRewardToken } from "./IncentivesDetailCard";

interface IncentivesButtonProps {
  totalApr?: ViewNumber;
  rewardTokens?: ViewRewardToken[];
  children: React.ReactNode;
  isLoading?: boolean;
  isFetched?: boolean;
}

export const IncentivesButton: React.FC<IncentivesButtonProps> = ({
  totalApr,
  rewardTokens,
  children,
  isLoading,
  isFetched,
}) => {
  if (isLoading || !isFetched) {
    return <span className="skeleton mt-[0.2px] flex w-20 h-6" />;
  }

  console.log("totalApr", totalApr);

  if (!totalApr?.viewValue) {
    return null;
  }

  return (
    <Tooltip tooltip={children}>
      <FlexRow className=" bg-smallElements-rewardAPY items-center gap-2 border border-solid px-2 py-1.5 rounded-[100px] border-metallicBorder">
        <FlexRow className="object-cover ">
          {rewardTokens?.map((rewardToken, index) => {
            return (
              <Icon
                key={index}
                className={index > 0 ? "-ml-1 w-4 h-4" : "w-4 h-4"}
                src={rewardToken.logo}
                alt="reward-token-logo"
              />
            );
          })}
        </FlexRow>
        <DisplayPercentage {...totalApr} typography="medium2" />
      </FlexRow>
    </Tooltip>
  );
};
