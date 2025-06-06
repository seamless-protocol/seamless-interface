import { Address } from "viem";
import { Icon, DisplayMoney, DisplayTokenAmount, DisplayPercentage, DisplayText } from "@shared";

import { TableButtons } from "./TableButtons";
import { Tag } from "../../../../../../components/strategy-data/Tag";

import { useFetchFormattedAllUserRewardsByStrategy } from "../../../../../../../statev3/hooks/user-rewards-by-strategy/UserRewardsByStrategy.hook";

import { useFetchFormattedAssetBalanceWithUsdValue } from "../../../../../../../statev3/queries/AssetBalanceWithUsdValue/AssetBalanceWithUsdValue.hook";
import { useFetchFormattedUserStrategyProfit } from "../../../../../../../statev3/hooks/user-strategy-profit/UserStrategyProfit.hook";
import { getColorBasedOnSign } from "../../../../../../utils/uiUtils";
import { UserInfoImageGroup } from "../UserInfoImageGroup";
import { TableDesktopRowComponent } from "../TableDesktopRowComponent";
import { SignIndicatingElement } from "../../../../../../components/other/SignIndicatingElement";
import { useFetchLeverageTokenByAddress } from "../../../../../../../data/leverage-tokens/queries/leverage-token-by-address/FetchLeverageTokenByAddress";

export const LeverageTokenTableDesktopRowContainer: React.FC<{
  address: Address;
  hideBorder?: boolean;
}> = ({ address, hideBorder }) => {
  const { data: leverageToken, ...rest } = useFetchLeverageTokenByAddress(address);

  const { data: allUserRewards, ...allUserRewardsRest } = useFetchFormattedAllUserRewardsByStrategy(address);
  const { data: balanceUsdPair, ...balanceUsdPairRest } = useFetchFormattedAssetBalanceWithUsdValue({
    asset: address,
  });
  const { data: strategyProfit, ...strategyProfitRest } = useFetchFormattedUserStrategyProfit({
    address,
  });

  return (
    <TableDesktopRowComponent
      hideBorder={hideBorder}
      name={<DisplayText typography="bold3" viewValue={leverageToken?.tokenData?.name} />}
      description={<DisplayText typography="regular1" viewValue={leverageToken?.additionalData?.description} />}
      logo={<Icon width={64} src={leverageToken?.tokenData?.logo} alt="logo" />}
      tag={
        <div>
          {rest?.isFetched ? (
            <Tag tag="LeverageToken" />
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
      tableButtons={<TableButtons strategy={address} />}
    />
  );
};
