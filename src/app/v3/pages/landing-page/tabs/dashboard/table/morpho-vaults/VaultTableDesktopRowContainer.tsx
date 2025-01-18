import {
  Icon,
  DisplayMoney,
  DisplayTokenAmount,
  DisplayPercentage,
  DisplayText,
  Displayable,
} from "@shared";

import { Tag } from "../../../../../../components/strategy-data/Tag";

import { getColorBasedOnSign } from "../../../../../../utils/uiUtils";
import { UserInfoImageGroup } from "../UserInfoImageGroup";
import { TableDesktopRowComponent } from "../TableDesktopRowComponent";
import { SignIndicatingElement } from "../../../../../../components/other/SignIndicatingElement";
import { ExtendedVaultPosition } from "../../../../../../../statev3/morpho/types/ExtendedVaultPosition";
import { useFetchFormattedUserStrategyProfit } from "../../../../../../../statev3/hooks/user-strategy-profit/UserStrategyProfit.hook";
import { Address } from "viem";


export const VaultTableDesktopRowContainer: React.FC<{
  vaultData: Displayable<ExtendedVaultPosition>;
  hideBorder?: boolean;
}> = ({ vaultData, hideBorder }) => {
  const { data: vault, ...vaultDataRest } = vaultData;

  const { data: strategyProfit, ...strategyProfitRest } = useFetchFormattedUserStrategyProfit({
    address: vault.mappedVaultDetails.vaultAddress as Address,
    assetAddress: vault.mappedVaultDetails.asset.address
  });

  return (
    <TableDesktopRowComponent
      hideBorder={hideBorder}
      name={<DisplayText typography="bold3" viewValue={vault.mappedVaultDetails.name} />}
      description={<DisplayText typography="regular1" viewValue={vault.mappedVaultDetails.asset.name} />}
      logo={<Icon width={64} src={vault.mappedVaultDetails.asset.logoURI || ""} alt="logo" />}
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
          viewValue={vault.vaultPosition.assets}
          {...vaultDataRest}
        />
      }
      dollarAmount={
        <DisplayMoney
          typography="medium1"
          viewValue={vault.vaultPosition.assetsUsd?.toString()}
          className="text-primary-600"
          isApproximate
          {...vaultDataRest}
        />
      }
      profitPercentage={
        <SignIndicatingElement noBackground dislayable={{
          data: strategyProfit?.unrealizedProfit,
          ...vaultDataRest
        }}>
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
          viewValue={vault.vaultPosition.vault.address}
          {...vaultDataRest}
        />
      }
      imageInfoGroup={<UserInfoImageGroup info={[]} />}
      tableButtons={<>todo</>}
    />
  );
};
