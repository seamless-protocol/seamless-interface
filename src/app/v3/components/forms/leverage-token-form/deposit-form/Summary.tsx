import { FlexRow, Typography, FlexCol, DisplayTokenAmount } from "@shared";
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

      <DataRow label={<FlexRow className="md:gap-1 items-center">Mint token fee</FlexRow>}>
        <DisplayTokenAmount
          typography="bold2"
          {...previewMintData.data?.previewMint.tokenFee.dollarAmount}
          symbolPosition="before"
          {...checkAuthentication(isConnected)}
        />
      </DataRow>
      <DataRow label={<FlexRow className="md:gap-1 items-center">DAO treasury fee</FlexRow>}>
        <DisplayTokenAmount
          typography="bold2"
          {...previewMintData.data?.previewMint.treasuryFee.dollarAmount}
          symbolPosition="before"
          {...checkAuthentication(isConnected)}
        />
      </DataRow>
      <DataRow label={<FlexRow className="md:gap-1 items-center">Deposited equity</FlexRow>}>
        <DisplayTokenAmount
          typography="bold2"
          {...previewMintData.data?.previewMint.minEquity.dollarAmount}
          symbolPosition="before"
          {...checkAuthentication(isConnected)}
        />
      </DataRow>
      <DataRow label={<FlexRow className="md:gap-1 items-center">Total debt</FlexRow>}>
        <DisplayTokenAmount
          typography="bold2"
          {...previewMintData.data?.previewMint.debt.tokenAmount}
          symbolPosition="before"
          {...checkAuthentication(isConnected)}
        />
      </DataRow>
      <DataRow label={<FlexRow className="md:gap-1 items-center">Total collateral </FlexRow>}>
        <DisplayTokenAmount
          typography="bold2"
          {...previewMintData.data?.previewMint.collateral.tokenAmount}
          symbolPosition="before"
          {...checkAuthentication(isConnected)}
        />
      </DataRow>
      <DataRow label={<FlexRow className="md:gap-1 items-center">DEX cost</FlexRow>}>
        <DisplayTokenAmount
          typography="bold2"
          {...previewMintData.data?.swapCost.dollarAmount}
          symbolPosition="before"
          {...checkAuthentication(isConnected)}
        />
      </DataRow>
    </FlexCol>
  );
};
