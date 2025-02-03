import { Address } from "viem";
import { DisplayText, FlexCol, Typography } from "@shared";
import { useFormattedVaultInfo } from "../../landing-page/tabs/morpho-vaults/hooks/useFetchAllVaults";
import { MorphoAprTooltip } from "../../../components/tooltip/MorphoAprTooltip";

export const VaultHeading: React.FC<{
  vault?: Address;
}> = ({ vault }) => {
  const { data: vaultInfo, ...restVaultInfo } = useFormattedVaultInfo(vault);

  return (
    <FlexCol>
      <div className="flex md:flex-row flex-col-reverse md:items-center gap-4">
        <DisplayText
          viewValue={vaultInfo?.name}
          typography="bold7"
          {...restVaultInfo}
          error={{
            message: restVaultInfo.error?.message,
          }}
        />

        {vaultInfo && (
          <div className="h-auto mt-[2px]">
            <MorphoAprTooltip netApyData={vaultInfo?.netApyData} />
          </div>
        )}
      </div>
      {vaultInfo?.description && <Typography type="regular5">{vaultInfo?.description}</Typography>}
    </FlexCol>
  );
};
