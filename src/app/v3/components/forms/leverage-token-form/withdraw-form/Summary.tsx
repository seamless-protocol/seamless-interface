import { FlexCol, Typography, DisplayMoney, StandardTooltip, FlexRow, DisplayTokenAmount } from "@shared";
import { useAccount } from "wagmi";
import { checkAuthentication } from "../../../../../utils/authenticationUtils";
import { DataRow } from "../../DataRow";
import { useLeverageTokenFormContext } from "../leverage-token-form-provider/LeverageTokenFormProvider";

export const Summary = () => {
  const { isConnected } = useAccount();

  const { previewRedeemData } = useLeverageTokenFormContext();

  return (
    <FlexCol>
      <FlexCol className="rounded-card bg-neutral-100 p-6 gap-4">
        <Typography type="bold3">Summary</Typography>

        <DataRow
          label={
            <FlexRow className="md:gap-1 items-center">
              Redeem token fee
              <StandardTooltip width={1}>
                <Typography type="medium2" className="text-navy-1000">
                  Some description about this fee.
                </Typography>
              </StandardTooltip>
            </FlexRow>
          }
        >
          <DisplayTokenAmount
            {...previewRedeemData.data?.previewRedeemData?.tokenFee?.dollarAmount}
            symbolPosition="before"
            {...checkAuthentication(isConnected)}
          />
        </DataRow>

        <DataRow
          label={
            <FlexRow className="md:gap-1 items-center">
              Treasury token fee
              <StandardTooltip width={1}>
                <Typography type="medium2" className="text-navy-1000">
                  Some description about this fee.
                </Typography>
              </StandardTooltip>
            </FlexRow>
          }
        >
          <DisplayTokenAmount
            {...previewRedeemData.data?.previewRedeemData?.treasuryFee?.dollarAmount}
            symbolPosition="before"
            {...checkAuthentication(isConnected)}
          />
        </DataRow>

        <DataRow label={<FlexRow className="md:gap-1 items-center">Received equity</FlexRow>}>
          <DisplayTokenAmount
            {...previewRedeemData.data?.previewRedeemData?.equity?.dollarAmount}
            symbolPosition="before"
            {...checkAuthentication(isConnected)}
          />
        </DataRow>
        <DataRow label={<FlexRow className="md:gap-1 items-center">Total debt</FlexRow>}>
          <DisplayTokenAmount
            {...previewRedeemData.data?.previewRedeemData?.debt?.tokenAmount}
            symbolPosition="before"
            {...checkAuthentication(isConnected)}
          />
        </DataRow>

        <DataRow label={<FlexRow className="md:gap-1 items-center">Total collateral </FlexRow>}>
          <DisplayTokenAmount
            {...previewRedeemData.data?.previewRedeemData?.collateral?.tokenAmount}
            symbolPosition="before"
            {...checkAuthentication(isConnected)}
          />
        </DataRow>

        <DataRow label={<FlexRow className="md:gap-1 items-center">DEX cost</FlexRow>}>
          <DisplayTokenAmount viewValue="0" symbol="$" symbolPosition="before" {...checkAuthentication(isConnected)} />
        </DataRow>
      </FlexCol>
    </FlexCol>
  );
};
