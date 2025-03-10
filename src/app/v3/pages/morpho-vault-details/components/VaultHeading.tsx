import { Address } from "viem";
import { DisplayText, FlexCol } from "@shared";
import { MorphoAprTooltip } from "../../../components/tooltip/MorphoAprTooltip";
import { useFetchFormattedFullVaultInfo } from "@data";

export const VaultHeading: React.FC<{
  vault?: Address;
}> = ({ vault }) => {
  const { data: vaultInfo, ...vaultInfoRest } = useFetchFormattedFullVaultInfo(vault);

  return (
    <FlexCol>
      <div className="flex md:flex-row flex-col-reverse md:items-center gap-4">
        <DisplayText
          viewValue={vaultInfo?.name}
          typography="bold7"
          {...vaultInfoRest}
          error={{
            message: vaultInfoRest.error?.message,
          }}
        />

        {vaultInfo && (
          <div className="h-auto mt-[2px]">
            <MorphoAprTooltip netApyData={vaultInfo?.netApyData} vaultAddress={vault} />
          </div>
        )}
      </div>
      {vaultInfo?.description && (
        <DisplayText
          {...vaultInfoRest}
          error={{
            message: vaultInfoRest.error?.message,
          }}
          typography="regular5"
          text={vaultInfo?.description}
        />
      )}
    </FlexCol>
  );
};
