import { Address } from "viem";
import { Icon, DisplayMoney, DisplayTokenAmount, Typography, DisplayPercentage, Displayable, FlexRow } from "@shared";
import { Tag } from "../../../../../../components/strategy-data/Tag";
import { TableMobileRowComponent } from "../TableMobileRowComponent";
import { getColorBasedOnSign } from "../../../../../../utils/uiUtils";
import { SignIndicatingElement } from "../../../../../../components/other/SignIndicatingElement";
import { ExtendedVaultPosition } from "../../../../../../../data/morpho/types/ExtendedVaultPosition";
import { MorphoTableButtons } from "./MorphoTableButtons";
import { useAccount } from "wagmi";
import { useMorphoExtendedUserRewards } from "../../../../../../../data/morpho/user-rewards/MorphoUserRewards.hook";
import { RewardsWarningTooltip } from "../../components/common/RewardsWarningTooltip";
import { useFetchFormattedUserStrategyProfit } from "../../../../../../../data/ilmv1-deprecated/hooks/user-strategy-profit/UserStrategyProfit.hook";

export const VaultTableMobileRowContainer: React.FC<{
  vaultData: Displayable<ExtendedVaultPosition>;
}> = ({ vaultData }) => {
  const { address } = useAccount();

  const { data: vault, ...vaultDataRest } = vaultData;

  const { data: strategyProfit, ...strategyProfitRest } = useFetchFormattedUserStrategyProfit({
    address: vault.mappedVaultDetails.vaultAddress as Address,
  });

  const { data: rewardData, ...restRewardData } = useMorphoExtendedUserRewards(address);

  return (
    <TableMobileRowComponent
      tag={<Tag tag="Vault" {...vaultDataRest} />}
      logo={<Icon width={30} src={vault?.mappedVaultDetails.asset.logoURI || ""} alt="Vault Logo" />}
      name={<Typography type="bold3">{vault?.mappedVaultDetails?.name}</Typography>}
      description={<Typography type="regular1">{vault?.mappedVaultDetails?.asset.name}</Typography>}
      rewards={
        <FlexRow className="gap-1">
          <DisplayMoney {...rewardData?.combinedClaimableNowViewValue} {...restRewardData} typography="bold3" />
          <RewardsWarningTooltip />
        </FlexRow>
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
        <DisplayTokenAmount viewValue={vaultData?.data.vaultPosition?.shares.viewValue} {...vaultData} />
      }
      holdingDollarAmount={
        <DisplayMoney
          typography="medium1"
          viewValue={vaultData?.data.vaultPosition?.sharesUsd.viewValue}
          className="text-primary-600"
          isApproximate
          {...vaultData}
        />
      }
      buttons={<MorphoTableButtons vault={vault.mappedVaultDetails.vaultAddress} />}
    />
  );
};
