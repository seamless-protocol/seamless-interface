import { Address } from "viem";
import {
  Icon,
  DisplayMoney,
  DisplayTokenAmount,
  Typography,
  FlexCol,
  DisplayPercentage,
} from "../../../../../../../../shared";
import { useFetchFullStrategyData } from "../../../../../../../statev3/metadata/FullStrategyData.all";
import { Tag } from "../../../../../../components/strategy-data/Tag";
import { TableMobileRowComponent } from "../TableMobileRowComponent";
import { TableButtons } from "./TableButtons";
import { useFetchFormattedAssetBalanceWithUsdValue } from "../../../../../../../statev3/queries/AssetBalanceWithUsdValue/AssetBalanceWithUsdValue.hook";
import { UserInfoImageGroup } from "../UserInfoImageGroup";
import { getColorBasedOnSign } from "../../../../../../utils/uiUtils";
import { SignIndicatingElement } from "../../../../../../components/other/SignIndicatingElement";
import { useFetchFormattedUserLeverageTokenProfit } from "../../../../../../../data/leverage-tokens/queries/leverage-token-profit/FetchFormattedUserLeverageTokenProfit.hook";
import { useFetchFormattedAllUserRewardsByLeverageToken } from "../../../../../../../data/leverage-tokens/queries/leverage-token-rewards/FetchFormattedAllUserRewardsByLeverageToken.hook";

export const LeverageTokenTableMobileRowContainer: React.FC<{ address: Address }> = ({ address }) => {
  const { data: strategyData, ...strategyDataRest } = useFetchFullStrategyData(address);

  const { data: allUserRewards, ...allUserRewardsRest } = useFetchFormattedAllUserRewardsByLeverageToken(address);
  const { data: balanceUsdPair, ...otherBalanceUsdPair } = useFetchFormattedAssetBalanceWithUsdValue({
    asset: address,
  });
  const { data: leverageTokenProfit, ...leverageTokenProfitRest } = useFetchFormattedUserLeverageTokenProfit({
    leverageToken: address,
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
            data: leverageTokenProfit?.unrealizedProfit,
            ...leverageTokenProfitRest,
          }}
        >
          <DisplayPercentage
            typography="bold3"
            viewValue={leverageTokenProfit?.unrealizedProfitPercentage.viewValue}
            className={`${getColorBasedOnSign(leverageTokenProfit?.unrealizedProfit.value)}`}
            {...leverageTokenProfitRest}
          />
          <DisplayMoney viewValue={leverageTokenProfit?.unrealizedProfit.viewValue} {...leverageTokenProfitRest} />
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
      buttons={<TableButtons strategy={address} />}
    />
  );
};
