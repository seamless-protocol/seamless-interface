import { Address } from "viem";
import { Icon, DisplayMoney, DisplayTokenAmount, DisplayPercentage, DisplayText } from "@shared";

import { TableButtons } from "./TableButtons";
import { Tag } from "../../../../../../components/strategy-data/Tag";

import { useFetchFormattedAssetBalanceWithUsdValue } from "../../../../../../../data/common/queries/AssetBalanceWithUsdValue/AssetBalanceWithUsdValue.hook";
import { getColorBasedOnSign } from "../../../../../../utils/uiUtils";
import { UserInfoImageGroup } from "../UserInfoImageGroup";
import { TableDesktopRowComponent } from "../TableDesktopRowComponent";
import { SignIndicatingElement } from "../../../../../../components/other/SignIndicatingElement";
import { useFetchLeverageTokenByAddress } from "../../../../../../../data/leverage-tokens/queries/leverage-token-by-address/FetchLeverageTokenByAddress";
import { useFuulRewardsWithDollarAmount } from "../../hooks/FuulRewardsWithDollarAmountWrapper";
import { LeverageTokenFormProvider } from "../../../../../../components/forms/leverage-token-form/leverage-token-form-provider/LeverageTokenFormProvider";
import { useFetchUserUnrealized } from "../../../../../../../data/leverage-tokens/queries/leverage-token-profit/unrealized-gain-loss.fetch";
import { useAccount } from "wagmi";

export const LeverageTokenTableDesktopRowContainer: React.FC<{
  address: Address;
  hideBorder?: boolean;
}> = ({ address, hideBorder }) => {
  const { data: leverageToken, ...rest } = useFetchLeverageTokenByAddress(address);

  const { address: userAddress } = useAccount();
  const {
    data: { rewards, dollarAmount },
    ...allUserRewardsRest
  } = useFuulRewardsWithDollarAmount(userAddress);

  const { data: balanceUsdPair, ...balanceUsdPairRest } = useFetchFormattedAssetBalanceWithUsdValue({
    asset: address,
  });
  const { data: leverageTokenProfit, ...leverageTokenProfitRest } = useFetchUserUnrealized(address);

  return (
    <TableDesktopRowComponent
      hideBorder={hideBorder}
      name={<DisplayText typography="bold3" viewValue={leverageToken?.tokenData?.name} />}
      description={<DisplayText typography="regular1" viewValue={leverageToken?.additionalData?.description} />}
      logo={<Icon width={64} src={leverageToken?.tokenData?.logo} alt="logo" />}
      tag={
        <div>
          {rest?.isFetched ? (
            <Tag tag="Leverage Token" />
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
        </SignIndicatingElement>
      }
      profitValue={
        <DisplayMoney
          typography="medium1"
          className="text-primary-600"
          viewValue={leverageTokenProfit?.unrealizedUsd.viewValue}
          isApproximate
          {...leverageTokenProfitRest}
        />
      }
      rewards={<DisplayMoney typography="bold3" viewValue={dollarAmount.viewValue} {...allUserRewardsRest} />}
      imageInfoGroup={<UserInfoImageGroup info={rewards} />}
      tableButtons={
        <LeverageTokenFormProvider defaultLeverageTokenAddress={address}>
          <TableButtons address={address} />
        </LeverageTokenFormProvider>
      }
    />
  );
};
