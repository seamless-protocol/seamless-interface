import {
  DisplayPercentage,
  FlexRow,
  Tooltip,
  Icon,
  ViewNumber,
} from "../../../../../shared";
import { ViewRewardToken } from "../../hooks/useFetchViewBaseAsset";

interface IncentivesButtonProps {
  totalApr?: ViewNumber;
  rewardTokens?: ViewRewardToken[];
  children: React.ReactNode;
}

export const IncentivesButton: React.FC<IncentivesButtonProps> = ({
  totalApr,
  rewardTokens,
  children,
}) => {
  return (
    <Tooltip tooltip={children}>
      <FlexRow className="items-center gap-1 border border-slate-200 p-1 rounded bg-[#ded6fe]">
        <DisplayPercentage {...totalApr} />
        <FlexRow className="object-cover ">
          {rewardTokens?.map((rewardToken, index) => {
            return (
              <Icon
                key={index}
                className={index > 0 ? "-ml-1 w-3 h-3" : "w-3 h-3"}
                src={rewardToken.logo}
                alt="reward-token-logo"
              />
            );
          })}
        </FlexRow>
      </FlexRow>
    </Tooltip>
  );
};
