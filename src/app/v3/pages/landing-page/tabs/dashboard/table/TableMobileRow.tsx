import { Address } from "viem";
import {
  DisplayMoney,
  DisplayPercentage,
  DisplayTokenAmount,
  FlexCol,
  FlexRow,
  Icon,
  ImageGroup,
  Typography,
} from "@shared";
import { TableButtons } from "./TableButtons";
import { Tag } from "../../../../../components/strategy-data/Tag";

import { useFetchFormattedAllUserRewardsByStrategy } from "../../../../../../statev3/hooks/user-rewards-by-strategy/UserRewardsByStrategy.hook";
import { useFetchFormattedUserStrategyProfit } from "../../../../../../statev3/hooks/user-strategy-profit/UserStrategyProfit.hook";
import { useFetchTokenData } from "../../../../../../statev3/metadata/TokenData.fetch";
import { useFetchFormattedAssetBalanceWithUsdValue } from "../../../../../../statev3/queries/AssetBalanceWithUsdValue.hook";
import { getSvgBasedOnSign, getColorBasedOnSign } from "../../../../../utils/uiUtils";

export const TableMobileRow: React.FC<{ strategy: Address }> = ({ strategy }) => {
  const { data: strategyData, ...strategyDataRest } = useFetchTokenData(strategy);

  const { data: allUserRewards, ...allUserRewardsRest } = useFetchFormattedAllUserRewardsByStrategy(strategy);
  const { data: balanceUsdPair, ...otherBalanceUsdPair } = useFetchFormattedAssetBalanceWithUsdValue({
    asset: strategy,
  });
  const { data: strategyProfit, ...strategyProfitRest } = useFetchFormattedUserStrategyProfit({ strategy });

  return (
    <div className="flex md:hidden flex-col bg-white shadow rounded-lg p-4 m-2">
      <FlexCol className="items-end mb-[-10px]">
        <div>
          <Tag key={strategyData?.type} tag={strategyData?.type} {...strategyDataRest} />
        </div>
      </FlexCol>

      <FlexRow className="items-center gap-4 mb-4">
        <Icon width={30} src={strategyData?.icon} isFetched={strategyDataRest.isFetched} alt="Strategy Logo" />
        <FlexCol>
          <Typography type="bold3">{strategyData?.name}</Typography>
          <Typography type="regular1">{strategyData?.description}</Typography>
        </FlexCol>
      </FlexRow>
      <FlexCol className="gap-5">
        <FlexRow className="justify-between w-full">
          <FlexCol className="items-start">
            <Typography type="regular1">Unclaimed Rewards</Typography>
            <FlexCol>
              <DisplayMoney viewValue={allUserRewards.totalRewardsUsd.viewValue} {...allUserRewardsRest} />
              <ImageGroup
                imageStyle="w-4"
                spacing="-space-x-3"
                images={allUserRewards.info
                  .filter((reward) => (reward.tokenAmount.bigIntValue || 0n) > 0n)
                  .map((reward) => reward.logo)}
              />
            </FlexCol>
          </FlexCol>
          <FlexCol className="items-end">
            <Typography type="regular1">Unrealized Gain/Loss</Typography>
            <FlexRow className="items-center gap-1">
              <Icon
                src={getSvgBasedOnSign(strategyProfit?.unrealizedProfitPercentage.value)}
                alt="polygon"
                width={12}
                height={12}
                hidden={!Number(strategyProfit?.unrealizedProfitPercentage.value)}
              />
              <DisplayPercentage
                typography="bold3"
                viewValue={strategyProfit?.unrealizedProfitPercentage.viewValue}
                className={`${getColorBasedOnSign(strategyProfit?.unrealizedProfitPercentage.value)}`}
                {...strategyProfitRest}
              />
            </FlexRow>
            <DisplayMoney viewValue={strategyProfit?.unrealizedProfit.viewValue} {...strategyProfitRest} />
          </FlexCol>
        </FlexRow>

        <FlexRow className="justify-between">
          <FlexCol>
            <Typography type="regular1">Holdings (LP token)</Typography>
            <DisplayTokenAmount viewValue={balanceUsdPair?.tokenAmount.viewValue} {...otherBalanceUsdPair} />
            <DisplayMoney
              typography="medium1"
              viewValue={balanceUsdPair?.dollarAmount.viewValue}
              {...otherBalanceUsdPair}
              className="text-primary-600"
            />
          </FlexCol>
          <TableButtons isStrategy strategy={strategy} />
        </FlexRow>
      </FlexCol>
    </div>
  );
};
