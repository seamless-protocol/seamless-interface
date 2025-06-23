import { Address } from "viem";
import { Icon, DisplayMoney, DisplayTokenAmount, DisplayPercentage, DisplayText } from "@shared";

import { TableButtons } from "./TableButtons";
import { Tag } from "../../../../../../components/strategy-data/Tag";

import { useFetchFormattedAllUserRewardsByStrategy } from "../../../../../../../data/ilmv1-deprecated/hooks/user-rewards-by-strategy/UserRewardsByStrategy.hook";

import { useFetchFormattedAssetBalanceWithUsdValue } from "../../../../../../../data/common/queries/AssetBalanceWithUsdValue/AssetBalanceWithUsdValue.hook";
import { getColorBasedOnSign } from "../../../../../../utils/uiUtils";
import { UserInfoImageGroup } from "../UserInfoImageGroup";
import { useFetchFullStrategyData } from "../../../../../../../data/ilmv1-deprecated/metadata/FullStrategyData.all";
import { TableDesktopRowComponent } from "../TableDesktopRowComponent";
import { SignIndicatingElement } from "../../../../../../components/other/SignIndicatingElement";
import { useFetchFormattedUserStrategyProfit } from "../../../../../../../data/ilmv1-deprecated/hooks/user-strategy-profit/UserStrategyProfit.hook";

export const StrategyTableDesktopRowContainer: React.FC<{
  strategy: Address;
  hideBorder?: boolean;
}> = ({ strategy, hideBorder }) => {
  const { data: strategyData, ...strategyDataRest } = useFetchFullStrategyData(strategy);

  const { data: allUserRewards, ...allUserRewardsRest } = useFetchFormattedAllUserRewardsByStrategy(strategy);
  const { data: balanceUsdPair, ...balanceUsdPairRest } = useFetchFormattedAssetBalanceWithUsdValue({
    asset: strategy,
  });
  const { data: strategyProfit, ...strategyProfitRest } = useFetchFormattedUserStrategyProfit({
    address: strategy,
  });

  return (
    <TableDesktopRowComponent
      hideBorder={hideBorder}
      name={<DisplayText typography="bold3" viewValue={strategyData?.name} />}
      description={<DisplayText typography="regular1" viewValue={strategyData?.description} />}
      logo={<Icon width={64} src={strategyData?.logo} alt="logo" />}
      tag={
        <div>
          {strategyDataRest?.isFetched ? (
            <Tag key={strategyData?.type} tag={strategyData?.type} />
          ) : (
            <div style={{ width: "60px", height: "30px" }} className="skeleton flex mb-[0.5px]" />
          )}
        </div>
      }
      tokenAmount={
        <DisplayTokenAmount
          typography="bold3"
          viewValue={balanceUsdPair?.tokenAmount.viewValue}
          {...balanceUsdPairRest}
        />
      }
      dollarAmount={
        <DisplayMoney
          typography="medium1"
          viewValue={balanceUsdPair?.dollarAmount.viewValue}
          className="text-primary-600"
          isApproximate
          {...balanceUsdPairRest}
        />
      }
      profitPercentage={
        <SignIndicatingElement
          noBackground
          dislayable={{
            data: strategyProfit?.unrealizedProfit,
            ...strategyProfitRest,
          }}
        >
          <DisplayPercentage
            typography="bold3"
            viewValue={strategyProfit?.unrealizedProfitPercentage.viewValue}
            className={`${getColorBasedOnSign(strategyProfit?.unrealizedProfit.value)}`}
            {...strategyProfitRest}
          />
        </SignIndicatingElement>
      }
      profitValue={
        <DisplayMoney
          typography="medium1"
          className="text-primary-600"
          viewValue={strategyProfit?.unrealizedProfit.viewValue}
          isApproximate
          {...strategyProfitRest}
        />
      }
      rewards={
        <DisplayMoney
          typography="bold3"
          viewValue={allUserRewards?.totalRewardsUsd.viewValue}
          {...allUserRewardsRest}
        />
      }
      imageInfoGroup={<UserInfoImageGroup info={allUserRewards?.info} />}
      tableButtons={<TableButtons strategy={strategy} />}
    />
  );
};
