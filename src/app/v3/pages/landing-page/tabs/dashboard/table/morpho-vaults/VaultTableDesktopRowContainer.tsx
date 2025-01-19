import { Icon, DisplayMoney, DisplayTokenAmount, DisplayPercentage, DisplayText, Displayable } from "@shared";

import { Tag } from "../../../../../../components/strategy-data/Tag";

import { getColorBasedOnSign } from "../../../../../../utils/uiUtils";
import { UserInfoImageGroup } from "../UserInfoImageGroup";
import { TableDesktopRowComponent } from "../TableDesktopRowComponent";
import { SignIndicatingElement } from "../../../../../../components/other/SignIndicatingElement";
import { ExtendedVaultPosition } from "../../../../../../../statev3/morpho/types/ExtendedVaultPosition";
import { useFetchFormattedUserStrategyProfit } from "../../../../../../../statev3/hooks/user-strategy-profit/UserStrategyProfit.hook";
import { Address } from "viem";
import { MorphoTableButtons } from "./MorphoTableButtons";
import { useFetchFormattedAssetBalanceWithUsdValue } from "../../../../../../../statev3/queries/AssetBalanceWithUsdValue.hook";

export const VaultTableDesktopRowContainer: React.FC<{
  vaultData: Displayable<ExtendedVaultPosition>;
  hideBorder?: boolean;
}> = ({ vaultData, hideBorder }) => {
  const { data: vault, ...vaultDataRest } = vaultData;

  const { data: balanceUsdPair, ...balanceUsdPairRest } = useFetchFormattedAssetBalanceWithUsdValue({
    asset: vault.mappedVaultDetails.vaultAddress,
  });

  const { data: strategyProfit, ...strategyProfitRest } = useFetchFormattedUserStrategyProfit({
    address: vault.mappedVaultDetails.vaultAddress as Address,
  });

  return (
    <TableDesktopRowComponent
      hideBorder={hideBorder}
      name={<DisplayText typography="bold3" viewValue={vault.mappedVaultDetails.name} />}
      description={<DisplayText typography="regular1" viewValue={vault.mappedVaultDetails.asset.name} />}
      logo={<Icon width={48} src={vault.mappedVaultDetails.asset.logoURI || ""} alt="logo" />}
      tag={
        <div>
          {vaultDataRest?.isFetched ? (
            <Tag tag="Vault" />
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
            ...vaultDataRest,
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
      rewards={<DisplayMoney typography="bold3" viewValue="TBD" symbol="" {...vaultDataRest} />}
      imageInfoGroup={<UserInfoImageGroup info={[]} />}
      tableButtons={<MorphoTableButtons vault={vault.mappedVaultDetails.vaultAddress} />}
    />
  );
};
