import { Address } from "viem";
import {
  Icon,
  DisplayMoney,
  DisplayTokenAmount,
  Typography,
  FlexCol,
  DisplayPercentage,
} from "../../../../../../../../shared";
import { useFetchFormattedAllUserRewardsByStrategy } from "../../../../../../../statev3/hooks/user-rewards-by-strategy/UserRewardsByStrategy.hook";
import { useFetchFullStrategyData } from "../../../../../../../statev3/metadata/FullStrategyData.all";
import { Tag } from "../../../../../../components/strategy-data/Tag";
import { TableMobileRowComponent } from "../TableMobileRowComponent";
import { TableButtons } from "./TableButtons";
import { useFetchFormattedUserStrategyProfit } from "../../../../../../../statev3/hooks/user-strategy-profit/UserStrategyProfit.hook";
import { useFetchFormattedAssetBalanceWithUsdValue } from "../../../../../../../statev3/queries/AssetBalanceWithUsdValue/AssetBalanceWithUsdValue.hook";
import { UserInfoImageGroup } from "../UserInfoImageGroup";
import { getColorBasedOnSign } from "../../../../../../utils/uiUtils";
import { SignIndicatingElement } from "../../../../../../components/other/SignIndicatingElement";
import { LeverageTokenFormProvider } from "../../../../../../components/forms/contexts/leverage-token-form-provider/LeverageTokenFormProvider";

export const StrategyTableMobileRowContainer: React.FC<{ strategy: Address }> = ({ strategy }) => {
  const { data: strategyData, ...strategyDataRest } = useFetchFullStrategyData(strategy);

  const { data: allUserRewards, ...allUserRewardsRest } = useFetchFormattedAllUserRewardsByStrategy(strategy);
  const { data: balanceUsdPair, ...otherBalanceUsdPair } = useFetchFormattedAssetBalanceWithUsdValue({
    asset: strategy,
  });
  const { data: strategyProfit, ...strategyProfitRest } = useFetchFormattedUserStrategyProfit({
    address: strategy,
  });

  return (
    <TableMobileRowComponent
      tag={<Tag key={strategyData?.type} tag={strategyData?.type} {...strategyDataRest} />}
      logo={<Icon width={30} src={strategyData?.logo} alt="Strategy Logo" />}
      name={<Typography type="bold3">{strategyData?.name}</Typography>}
      description={<Typography type="regular1">{strategyData?.description}</Typography>}
      rewards={
        <FlexCol>
          <DisplayMoney viewValue={allUserRewards.totalRewardsUsd.viewValue} {...allUserRewardsRest} />
          <UserInfoImageGroup info={allUserRewards.info} />
        </FlexCol>
      }
      profit={
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
          <DisplayMoney viewValue={strategyProfit?.unrealizedProfit.viewValue} {...strategyProfitRest} />
        </SignIndicatingElement>
      }
      holdingTokenAmount={
        <DisplayTokenAmount viewValue={balanceUsdPair?.tokenAmount.viewValue} {...otherBalanceUsdPair} />
      }
      holdingDollarAmount={
        <DisplayMoney
          typography="medium1"
          viewValue={balanceUsdPair?.dollarAmount.viewValue}
          {...otherBalanceUsdPair}
          className="text-primary-600"
        />
      }
      buttons={
        <LeverageTokenFormProvider defaultLeverageTokenAddress={strategy}>
          <TableButtons leverageTokenAddress={strategy} />
        </LeverageTokenFormProvider>
      }
    />
  );
};
