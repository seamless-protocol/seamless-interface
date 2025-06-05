import { FlexRow, Typography, FlexCol, DisplayTokenAmount, StandardTooltip } from "@shared";
import { useAccount } from "wagmi";
import { checkAuthentication } from "../../../../../utils/authenticationUtils";
import { DataRow } from "../../DataRow";
import { useLeverageTokenFormContext } from "../leverage-token-form-provider/LeverageTokenFormProvider";

export const Summary: React.FC = () => {
  const { previewMintData } = useLeverageTokenFormContext();
  const { isConnected } = useAccount();

  return (
    <FlexCol className="rounded-card bg-neutral-100 p-6 gap-3 cursor-default">
      <Typography type="bold3">Summary</Typography>

      <DataRow
        label={
          <FlexRow className="md:gap-1 items-center">
            Mint token fee
            <StandardTooltip width={1} openOnClick={false}>
              <Typography type="medium2" className="text-navy-1000">
                Some description about this fee.
              </Typography>
            </StandardTooltip>
          </FlexRow>
        }
      >
        <DisplayTokenAmount
          typography="bold2"
          {...previewMintData.data?.tokenFee.dollarAmount}
          symbolPosition="before"
          {...checkAuthentication(isConnected)}
        />
      </DataRow>
      <DataRow
        label={
          <FlexRow className="md:gap-1 items-center">
            Treasury token fee
            <StandardTooltip width={1} openOnClick={false}>
              <Typography type="medium2" className="text-navy-1000">
                Some description about this fee.
              </Typography>
            </StandardTooltip>
          </FlexRow>
        }
      >
        <DisplayTokenAmount
          typography="bold2"
          {...previewMintData.data?.treasuryFee.dollarAmount}
          symbolPosition="before"
          {...checkAuthentication(isConnected)}
        />
      </DataRow>
      <DataRow label={<FlexRow className="md:gap-1 items-center">Deposited equity</FlexRow>}>
        <DisplayTokenAmount
          typography="bold2"
          {...previewMintData.data?.equity.dollarAmount}
          symbolPosition="before"
          {...checkAuthentication(isConnected)}
        />
      </DataRow>
      <DataRow label={<FlexRow className="md:gap-1 items-center">Total debt</FlexRow>}>
        <DisplayTokenAmount
          typography="bold2"
          {...previewMintData.data?.debt.tokenAmount}
          symbolPosition="before"
          {...checkAuthentication(isConnected)}
        />
      </DataRow>
      <DataRow label={<FlexRow className="md:gap-1 items-center">Total collateral </FlexRow>}>
        <DisplayTokenAmount
          typography="bold2"
          {...previewMintData.data?.collateral.tokenAmount}
          symbolPosition="before"
          {...checkAuthentication(isConnected)}
        />
      </DataRow>
      <DataRow label={<FlexRow className="md:gap-1 items-center">DEX cost</FlexRow>}>
        <DisplayTokenAmount
          typography="bold2"
          viewValue="0"
          symbol="$"
          symbolPosition="before"
          {...checkAuthentication(isConnected)}
        />
      </DataRow>
    </FlexCol>
  );
};
