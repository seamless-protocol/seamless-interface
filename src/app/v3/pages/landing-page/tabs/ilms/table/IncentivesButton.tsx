import { Address } from "viem";
import { useFetchStrategyIncentives } from "../../../../../../state/loop-strategy/hooks/useFetchViewStrategyIncentives";
import { DisplayPercentage, FlexRow, ImageGroup } from "../../../../../../../shared";

export const IncentivesButton: React.FC<{ strategy: Address }> = ({ strategy }) => {
  const { data, isLoading, isFetched, isError } = useFetchStrategyIncentives(strategy);

  if (isLoading || !isFetched) {
    return <span className="skeleton mt-[0.2px] flex w-20 h-6" />;
  }

  if (!data.totalApr?.viewValue) {
    return null;
  }

  return (
    <FlexRow className="items-center gap-1 border border-solid px-2 py-1.5 rounded-xl border-metallicBorder bg-smallElements-rewardAPY max-w-max">
      <ImageGroup
        imageStyle="w-4"
        spacing="-space-x-3"
        images={data.rewardTokens.map((rewardToken) => rewardToken.logo)}
      />
      <DisplayPercentage {...data.totalApr} typography="medium1" isError={isError} />
    </FlexRow>
  );
};
