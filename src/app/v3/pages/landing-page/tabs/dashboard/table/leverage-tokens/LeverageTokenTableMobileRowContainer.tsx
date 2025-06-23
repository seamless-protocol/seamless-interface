import { Address } from "viem";
import { Icon, DisplayMoney, DisplayTokenAmount, DisplayPercentage, DisplayText, FlexCol } from "@shared";
import { Tag } from "../../../../../../components/strategy-data/Tag";
import { TableMobileRowComponent } from "../TableMobileRowComponent";
import { TableButtons } from "./TableButtons";
import { UserInfoImageGroup } from "../UserInfoImageGroup";
import { getColorBasedOnSign } from "../../../../../../utils/uiUtils";
import { SignIndicatingElement } from "../../../../../../components/other/SignIndicatingElement";
import { useFetchFormattedAssetBalanceWithUsdValue } from "../../../../../../../data/common/queries/AssetBalanceWithUsdValue/AssetBalanceWithUsdValue.hook";
import { useFetchLeverageTokenByAddress } from "../../../../../../../data/leverage-tokens/queries/leverage-token-by-address/FetchLeverageTokenByAddress";
import { useFuulRewardsWithDollarAmount } from "../../hooks/FuulRewardsWithDollarAmountWrapper";
import { LeverageTokenFormProvider } from "../../../../../../components/forms/leverage-token-form/leverage-token-form-provider/LeverageTokenFormProvider";
import { useFetchUserUnrealized } from "../../../../../../../data/leverage-tokens/queries/leverage-token-profit/unrealized-gain-loss.fetch";
import { useAccount } from "wagmi";

export const LeverageTokenTableMobileRowContainer: React.FC<{ address: Address }> = ({ address }) => {
  const { address: userAddress } = useAccount();
  const { data: leverageToken, ...leverageTokenRest } = useFetchLeverageTokenByAddress(address);

  const {
    data: { rewards, dollarAmount },
    ...allUserRewardsRest
  } = useFuulRewardsWithDollarAmount(userAddress);

  const { data: balanceUsdPair, ...balanceUsdPairRest } = useFetchFormattedAssetBalanceWithUsdValue({
    asset: address,
  });

  const { data: leverageTokenProfit, ...leverageTokenProfitRest } = useFetchUserUnrealized(address);

  return (
    <TableMobileRowComponent
      tag={
        leverageTokenRest.isFetched ? (
          <Tag tag="Leverage Token" />
        ) : (
          <div style={{ width: "60px", height: "24px" }} className="skeleton mb-[0.5px]" />
        )
      }
      logo={
        <Icon
          width={30}
          src={leverageToken?.tokenData?.logo}
          alt="Leverage Token Logo"
          {...(leverageTokenRest.isFetched ? {} : { className: "skeleton" })}
        />
      }
      name={<DisplayText typography="bold3" viewValue={leverageToken?.tokenData?.name} {...leverageTokenRest} />}
      description={
        <DisplayText
          typography="regular1"
          viewValue={leverageToken?.additionalData?.description}
          {...leverageTokenRest}
        />
      }
      rewards={
        <FlexCol>
          <DisplayMoney typography="medium1" viewValue={dollarAmount.viewValue} {...allUserRewardsRest} />
          <UserInfoImageGroup info={rewards} />
        </FlexCol>
      }
      profit={
        <SignIndicatingElement
          noBackground
          dislayable={{
            data: leverageTokenProfit?.unrealizedPercent,
            ...leverageTokenProfitRest,
          }}
        >
          <DisplayPercentage
            typography="bold3"
            viewValue={leverageTokenProfit?.unrealizedPercent.viewValue}
            className={`${getColorBasedOnSign(leverageTokenProfit?.unrealizedPercent.value)}`}
            {...leverageTokenProfitRest}
          />
          <DisplayMoney
            typography="medium1"
            viewValue={leverageTokenProfit?.unrealizedPercent.viewValue}
            {...leverageTokenProfitRest}
          />
        </SignIndicatingElement>
      }
      holdingTokenAmount={
        <DisplayTokenAmount
          typography="bold3"
          viewValue={balanceUsdPair?.tokenAmount.viewValue}
          {...balanceUsdPairRest}
        />
      }
      holdingDollarAmount={
        <DisplayMoney
          typography="medium1"
          viewValue={balanceUsdPair?.dollarAmount.viewValue}
          className="text-primary-600"
          {...balanceUsdPairRest}
        />
      }
      buttons={
        <LeverageTokenFormProvider defaultLeverageTokenAddress={address}>
          <TableButtons address={address} />
        </LeverageTokenFormProvider>
      }
    />
  );
};
