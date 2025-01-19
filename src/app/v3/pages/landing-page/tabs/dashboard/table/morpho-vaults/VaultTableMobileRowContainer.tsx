import { Address } from "viem";
import { Icon, DisplayMoney, DisplayTokenAmount, Typography, DisplayPercentage, Displayable } from "@shared";
import { Tag } from "../../../../../../components/strategy-data/Tag";
import { TableMobileRowComponent } from "../TableMobileRowComponent";
import { useFetchFormattedUserStrategyProfit } from "../../../../../../../statev3/hooks/user-strategy-profit/UserStrategyProfit.hook";
import { getColorBasedOnSign } from "../../../../../../utils/uiUtils";
import { SignIndicatingElement } from "../../../../../../components/other/SignIndicatingElement";
import { ExtendedVaultPosition } from "../../../../../../../statev3/morpho/types/ExtendedVaultPosition";
import { MorphoTableButtons } from "./MorphoTableButtons";

export const VaultTableMobileRowContainer: React.FC<{
  vaultData: Displayable<ExtendedVaultPosition>;
}> = ({ vaultData }) => {
  const { data: vault, ...vaultDataRest } = vaultData;

  const { data: strategyProfit, ...strategyProfitRest } = useFetchFormattedUserStrategyProfit({
    address: vault.mappedVaultDetails.vaultAddress as Address,
  });
  return (
    <TableMobileRowComponent
      tag={<Tag tag="Vault" {...vaultDataRest} />}
      logo={<Icon width={30} src={vault?.mappedVaultDetails.asset.logoURI || ""} alt="Vault Logo" />}
      name={<Typography type="bold3">{vault?.mappedVaultDetails?.name}</Typography>}
      description={<Typography type="regular1">{vault?.mappedVaultDetails?.asset.name}</Typography>}
      rewards={
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
      holdingTokenAmount={<DisplayTokenAmount viewValue={vault.vaultPosition.assetsUsd.viewValue} {...vaultDataRest} />}
      holdingDollarAmount={
        <DisplayMoney
          typography="medium1"
          viewValue={vault.vaultPosition.assetsUsd.viewValue}
          {...vaultDataRest}
          className="text-primary-600"
        />
      }
      buttons={<MorphoTableButtons vault={vault.mappedVaultDetails.vaultAddress} />}
    />
  );
};
