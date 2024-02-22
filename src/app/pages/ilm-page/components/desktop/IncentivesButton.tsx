import {
  DisplayPercentage,
  FlexRow,
  ValueSymbolPair,
} from "../../../../../shared";
import { ViewRewardToken } from "../../../../state/lending-borrowing/types/ViewBaseAsset";

interface IncentivesButtonProps {
  totalApy?: ValueSymbolPair;
  rewardTokens?: ViewRewardToken[];
}

export const IncentivesButton: React.FC<IncentivesButtonProps> = ({
  totalApy,
  rewardTokens,
}) => {
  return (
    <FlexRow
      className="items-center gap-1 border border-slate-200 p-1 rounded bg-[#ded6fe]
    "
    >
      <DisplayPercentage
        viewValue={totalApy?.value}
        symbol={totalApy?.symbol}
      />
      <FlexRow className="object-cover ">
        {rewardTokens?.map((rewardToken, index) => {
          return (
            <img
              key={index}
              className={index > 0 ? "-ml-1 w-3 h-3" : "w-3 h-3"}
              src={rewardToken.logo}
            ></img>
          );
        })}
      </FlexRow>
    </FlexRow>
  );
};
