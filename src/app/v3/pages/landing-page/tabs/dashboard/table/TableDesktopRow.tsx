import { Address } from "viem";
import {
  TableRow,
  TableCell,
  Icon,
  FlexCol,
  FlexRow,
  DisplayMoney,
  DisplayTokenAmount,
  DisplayPercentage,
  DisplayText,
} from "@shared";

import { TableButtons } from "./TableButtons";
import { Tag } from "../../../../../components/strategy-data/Tag";

import { useFetchFormattedAllUserRewardsByStrategy } from "../../../../../../statev3/hooks/user-rewards-by-strategy/UserRewardsByStrategy.hook";

import { useFetchFormattedAssetBalanceWithUsdValue } from "../../../../../../statev3/queries/AssetBalanceWithUsdValue.hook";
import { useFetchFormattedUserStrategyProfit } from "../../../../../../statev3/hooks/user-strategy-profit/UserStrategyProfit.hook";
import { getColorBasedOnSign, getSvgBasedOnSign } from "../../../../../utils/uiUtils";
import { UserInfoImageGroup } from "./UserInfoImageGroup";
import { useFetchFullStrategyData } from "../../../../../../statev3/metadata/FullStrategyData.all";

export const TableDesktopRow: React.FC<{
  strategy: Address;
  hideBorder?: boolean;
}> = ({ strategy, hideBorder }) => {
  const { data: strategyData, ...strategyDataRest } = useFetchFullStrategyData(strategy);

  const { data: allUserRewards, ...allUserRewardsRest } = useFetchFormattedAllUserRewardsByStrategy(strategy);
  const { data: balanceUsdPair, ...balanceUsdPairRest } = useFetchFormattedAssetBalanceWithUsdValue({
    asset: strategy,
  });
  const { data: strategyProfit, ...strategyProfitRest } = useFetchFormattedUserStrategyProfit({ strategy });

  return (
    <TableRow
      className={`hidden md:grid grid-cols-22 cursor-pointer items-center border-solid min-h-[148px] ${
        hideBorder ? "" : "border-b border-b-navy-100"
      }`}
    >
      <TableCell alignItems="items-start col-span-6 pr-6">
        <FlexRow className="gap-4 items-center max-w-full">
          <Icon width={64} src={strategyData?.icon} alt="logo" />
          <FlexCol className="gap-2 text-start max-w-full">
            <FlexCol className="gap-[2px] max-w-full">
              <DisplayText typography="bold3" viewValue={strategyData?.name} />
              <DisplayText typography="regular1" viewValue={strategyData?.description} />
            </FlexCol>
          </FlexCol>
        </FlexRow>
      </TableCell>

      <TableCell className="col-span-2">
        <div>
          {/* todo refactor this */}
          {strategyDataRest?.isFetched ? (
            <Tag key={strategyData?.type} tag={strategyData?.type} />
          ) : (
            <div style={{ width: "60px", height: "30px" }} className="skeleton flex mb-[0.5px]" />
          )}
        </div>
      </TableCell>
      <TableCell className="col-span-3">
        <FlexCol>
          <DisplayTokenAmount
            typography="bold3"
            viewValue={balanceUsdPair?.tokenAmount.viewValue}
            {...balanceUsdPairRest}
          />
          <DisplayMoney
            typography="medium1"
            viewValue={balanceUsdPair?.dollarAmount.viewValue}
            {...balanceUsdPairRest}
            className="text-primary-600"
            isApproximate
          />
        </FlexCol>
      </TableCell>
      <TableCell className="col-span-3">
        <FlexCol>
          <FlexRow className="items-center gap-1">
            <Icon
              src={getSvgBasedOnSign(strategyProfit?.unrealizedProfit.value)}
              alt="polygon"
              width={12}
              height={12}
              hidden={!Number(strategyProfit?.unrealizedProfit.value)}
            />
            <DisplayPercentage
              typography="bold3"
              viewValue={strategyProfit?.unrealizedProfitPercentage.viewValue}
              className={`${getColorBasedOnSign(strategyProfit?.unrealizedProfit.value)}`}
              {...strategyProfitRest}
            />
          </FlexRow>
          <DisplayMoney
            typography="medium1"
            className="text-primary-600"
            viewValue={strategyProfit?.unrealizedProfit.viewValue}
            {...strategyProfitRest}
            isApproximate
          />
        </FlexCol>
      </TableCell>
      <TableCell className="col-span-3">
        <FlexCol>
          <DisplayMoney
            typography="bold3"
            viewValue={allUserRewards.totalRewardsUsd.viewValue}
            {...allUserRewardsRest}
          />
          <UserInfoImageGroup info={allUserRewards.info} />
        </FlexCol>
      </TableCell>
      <TableCell className="col-span-5 flex justify-evenly items-center">
        <TableButtons strategy={strategy} isStrategy />
      </TableCell>
    </TableRow>
  );
};
