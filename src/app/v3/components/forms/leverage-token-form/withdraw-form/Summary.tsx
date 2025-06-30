import { FlexCol, Typography, FlexRow, DisplayTokenAmount } from "@shared";
import { DataRow } from "../../DataRow";
import { useLeverageTokenFormContext } from "../leverage-token-form-provider/LeverageTokenFormProvider";

export const Summary = () => {
  const { previewRedeemData } = useLeverageTokenFormContext();

  return (
    <FlexCol>
      <FlexCol className="rounded-card bg-neutral-100 p-6 gap-3">
        <Typography type="bold3">Summary</Typography>

        <DataRow label={<FlexRow className="md:gap-1 items-center">Redeem token fee</FlexRow>}>
          <DisplayTokenAmount
            {...previewRedeemData}
            {...previewRedeemData.data?.previewRedeemData?.tokenFee?.dollarAmount}
            symbolPosition="before"
          />
        </DataRow>

        <DataRow label={<FlexRow className="md:gap-1 items-center">DAO treasury fee</FlexRow>}>
          <DisplayTokenAmount
            typography="bold2"
            {...previewRedeemData}
            {...previewRedeemData.data?.previewRedeemData?.treasuryFee?.dollarAmount}
            symbolPosition="before"
          />
        </DataRow>

        <DataRow label={<FlexRow className="md:gap-1 items-center">Received equity</FlexRow>}>
          <DisplayTokenAmount
            typography="bold2"
            {...previewRedeemData}
            {...previewRedeemData.data?.equityAfterSwapCost?.dollarAmount}
            symbolPosition="before"
          />
        </DataRow>
        <DataRow label={<FlexRow className="md:gap-1 items-center">Total debt</FlexRow>}>
          <DisplayTokenAmount
            typography="bold2"
            {...previewRedeemData}
            {...previewRedeemData.data?.previewRedeemData?.debt?.tokenAmount}
            symbolPosition="before"
          />
        </DataRow>

        <DataRow label={<FlexRow className="md:gap-1 items-center">Total collateral </FlexRow>}>
          <DisplayTokenAmount
            typography="bold2"
            {...previewRedeemData}
            {...previewRedeemData.data?.previewRedeemData?.collateral?.tokenAmount}
            symbolPosition="before"
          />
        </DataRow>

        <DataRow label={<FlexRow className="md:gap-1 items-center">DEX cost</FlexRow>}>
          <DisplayTokenAmount
            typography="bold2"
            {...previewRedeemData}
            {...previewRedeemData.data?.swapCost?.dollarAmount}
            symbolPosition="before"
          />
        </DataRow>
      </FlexCol>
    </FlexCol>
  );
};
