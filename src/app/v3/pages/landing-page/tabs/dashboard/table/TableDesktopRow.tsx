import { Address } from "viem";
import {
  TableRow,
  TableCell,
  Icon,
  FlexCol,
  Typography,
  FlexRow,
  ImageGroup,
  DisplayMoney,
  DisplayTokenAmount,
  DisplayPercentage,
} from "@shared";

import { TableButtons } from "./TableButtons";
import { Tag } from "../../../../../components/strategy-data/Tag";

import { useFetchTokenData } from "../../../../../../statev3/metadata/TokenData.fetch";
import { useFetchFormattedAllUserRewardsByStrategy } from "../../../../../../statev3/hooks/user-rewards-by-strategy/UserRewardsByStrategy.hook";

import { useFetchFormattedAssetBalanceWithUsdValue } from "../../../../../../statev3/queries/AssetBalanceWithUsdValue.hook";
import { useFetchFormattedUserStrategyProfit } from "../../../../../../statev3/hooks/user-strategy-profit/UserStrategyProfit.hook";
import { getColorBasedOnSign, getSvgBasedOnSign } from "../../../../../utils/uiUtils";

export const TableDesktopRow: React.FC<{
  strategy: Address;
  hideBorder?: boolean;
}> = ({ strategy, hideBorder }) => {
  const { data: strategyData, ...strategyDataRest } = useFetchTokenData(strategy);

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
        <FlexRow className="gap-4 items-center">
          <Icon width={64} src={strategyData?.icon} {...strategyDataRest} alt="logo" />
          <FlexCol className="gap-2 text-start">
            <FlexCol className="gap-[2px]">
              <Typography type="bold3">{strategyData?.name}</Typography>
              <Typography type="regular1">{strategyData?.description}</Typography>
            </FlexCol>
          </FlexCol>
        </FlexRow>
      </TableCell>

      <TableCell className="col-span-2">
        <div>
          <Tag key={strategyData?.type} tag={strategyData?.type} {...strategyDataRest} />
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
          />
        </FlexCol>
      </TableCell>
      <TableCell className="col-span-3">
        <FlexCol>
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
          <DisplayMoney
            typography="medium1"
            className="text-primary-600"
            viewValue={strategyProfit?.unrealizedProfit.viewValue}
            {...strategyProfitRest}
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
          <ImageGroup
            imageStyle="w-4"
            spacing="-space-x-3"
            images={allUserRewards.info
              .filter((reward) => (reward.tokenAmount.bigIntValue || 0n) > 0n)
              .map((reward) => reward.logo)}
          />
        </FlexCol>
      </TableCell>
      <TableCell className="col-span-5 flex justify-evenly items-center">
        <TableButtons strategy={strategy} isStrategy />
      </TableCell>
    </TableRow>
  );
};
