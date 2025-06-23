import { Icon, DisplayMoney, DisplayTokenAmount, DisplayPercentage, DisplayText, Displayable, FlexRow } from "@shared";

import { Tag } from "../../../../../../components/strategy-data/Tag";

import { getColorBasedOnSign } from "../../../../../../utils/uiUtils";
import { TableDesktopRowComponent } from "../TableDesktopRowComponent";
import { SignIndicatingElement } from "../../../../../../components/other/SignIndicatingElement";
import { ExtendedVaultPosition } from "../../../../../../../data/morpho/types/ExtendedVaultPosition";
import { Address } from "viem";
import { MorphoTableButtons } from "./MorphoTableButtons";
import { useMorphoExtendedUserRewards } from "../../../../../../../data/morpho/user-rewards/MorphoUserRewards.hook";
import { useAccount } from "wagmi";
import { RewardsImageGroup } from "./RewardsImageGroup";
import { RewardsWarningTooltip } from "../../components/common/RewardsWarningTooltip";
import { useFetchFormattedUserStrategyProfit } from "../../../../../../../data/ilmv1-deprecated/hooks/user-strategy-profit/UserStrategyProfit.hook";

export const VaultTableDesktopRowContainer: React.FC<{
  vaultData: Displayable<ExtendedVaultPosition>;
  hideBorder?: boolean;
}> = ({ vaultData, hideBorder }) => {
  const { address } = useAccount();

  const { data: vault, ...vaultDataRest } = vaultData;

  const { data: strategyProfit, ...strategyProfitRest } = useFetchFormattedUserStrategyProfit({
    address: vault.mappedVaultDetails.vaultAddress as Address,
  });

  const { data: rewardData, ...restRewardData } = useMorphoExtendedUserRewards(address);

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
          viewValue={vaultData?.data.vaultPosition?.shares.viewValue}
          {...vaultData}
        />
      }
      dollarAmount={
        <DisplayMoney
          typography="medium1"
          viewValue={vaultData?.data.vaultPosition?.sharesUsd.viewValue}
          className="text-primary-600"
          isApproximate
          {...vaultData}
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
      rewards={
        <FlexRow className="gap-1">
          <DisplayMoney {...rewardData?.combinedClaimableNowViewValue} {...restRewardData} typography="bold3" />
          <RewardsWarningTooltip />
        </FlexRow>
      }
      imageInfoGroup={
        <RewardsImageGroup
          icons={[
            ...new Set(vault.mappedVaultDetails.rewards?.map((reward) => reward.asset.logoURI || undefined) || []),
          ]}
        />
      }
      tableButtons={<MorphoTableButtons vault={vault.mappedVaultDetails.vaultAddress} />}
    />
  );
};
