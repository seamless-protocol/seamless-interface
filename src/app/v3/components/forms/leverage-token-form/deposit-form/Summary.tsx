import { FlexRow, Typography, FlexCol, DisplayTokenAmount } from "@shared";
import { DataRow } from "../../DataRow";
import { useLeverageTokenFormContext } from "../leverage-token-form-provider/LeverageTokenFormProvider";

export const Summary: React.FC = () => {
  const { previewMintData } = useLeverageTokenFormContext();

  if (!previewMintData.isFetched && !previewMintData.isError && !previewMintData.isLoading) {
    return null;
  }

  return (
    <FlexCol className="rounded-card bg-neutral-100 p-6 gap-3 cursor-default">
      <Typography type="bold3">Summary</Typography>

      <DataRow label={<FlexRow className="md:gap-1 items-center">Mint token fee</FlexRow>}>
        <DisplayTokenAmount
          typography="bold2"
          {...previewMintData}
          {...previewMintData.data?.previewMint.tokenFee.dollarAmount}
          symbolPosition="before"
        />
      </DataRow>
      <DataRow label={<FlexRow className="md:gap-1 items-center">DAO treasury fee</FlexRow>}>
        <DisplayTokenAmount
          typography="bold2"
          {...previewMintData}
          {...previewMintData.data?.previewMint.treasuryFee.dollarAmount}
          symbolPosition="before"
        />
      </DataRow>
      <DataRow label={<FlexRow className="md:gap-1 items-center">Deposited equity</FlexRow>}>
        <DisplayTokenAmount
          typography="bold2"
          {...previewMintData}
          {...previewMintData.data?.previewMint.minEquity.dollarAmount}
          symbolPosition="before"
        />
      </DataRow>
      <DataRow label={<FlexRow className="md:gap-1 items-center">Total debt</FlexRow>}>
        <DisplayTokenAmount
          typography="bold2"
          {...previewMintData}
          {...previewMintData.data?.previewMint.debt.tokenAmount}
          symbolPosition="before"
        />
      </DataRow>
      <DataRow label={<FlexRow className="md:gap-1 items-center">Total collateral </FlexRow>}>
        <DisplayTokenAmount
          typography="bold2"
          {...previewMintData}
          {...previewMintData.data?.previewMint.collateral.tokenAmount}
          symbolPosition="before"
        />
      </DataRow>
      <DataRow label={<FlexRow className="md:gap-1 items-center">DEX cost</FlexRow>}>
        <DisplayTokenAmount
          typography="bold2"
          {...previewMintData}
          {...previewMintData.data?.swapCost.dollarAmount}
          symbolPosition="before"
        />
      </DataRow>
    </FlexCol>
  );
};
