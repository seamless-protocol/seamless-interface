import { FlexRow, Typography, FlexCol, DisplayTokenAmount, StandardTooltip } from "@shared";
import { useAccount } from "wagmi";
import { useFetchPreviewDepositCostInUsdAndUnderlying } from "../../../../../state/loop-strategy/hooks/useFetchDepositCostInUsdAndUnderlying";
import { checkAuthentication } from "../../../../../utils/authenticationUtils";
import { DataRow } from "../../DataRow";
import { useLeverageTokenFormContext } from "../leverage-token-form-provider/LeverageTokenFormProvider";

export const Summary: React.FC = () => {
  const { debouncedDepositAmount, selectedLeverageToken } = useLeverageTokenFormContext();
  const { isConnected } = useAccount();

  const { data: costData, ...restCost } = useFetchPreviewDepositCostInUsdAndUnderlying(
    debouncedDepositAmount,
    selectedLeverageToken?.data?.address
  );

  return (
    <FlexCol className="rounded-card bg-neutral-100 p-6 gap-4 cursor-default">
      <Typography type="bold3">Summary</Typography>

      <DataRow
        label={
          <FlexRow className="md:gap-1 items-center">
            3rd party DEX fees
            <StandardTooltip width={1}>
              <Typography type="medium2" className="text-navy-1000">
                DEX fees and price impact incurred to keep the strategy <br /> at the target multiple after your
                deposit. If transaction cost <br /> is high, try depositing smaller amounts over time.
              </Typography>
            </StandardTooltip>
          </FlexRow>
        }
      >
        <DisplayTokenAmount
          {...restCost}
          {...costData?.cost.dollarAmount}
          symbolPosition="before"
          {...checkAuthentication(isConnected)}
        />
      </DataRow>
    </FlexCol>
  );
};
