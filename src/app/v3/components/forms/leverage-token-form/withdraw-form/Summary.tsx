import { FlexCol, Typography, DisplayMoney, StandardTooltip, FlexRow } from "@shared";
import { useAccount } from "wagmi";
import { checkAuthentication } from "../../../../../utils/authenticationUtils";

export const Summary = () => {
  const { isConnected } = useAccount();

  return (
    <FlexCol>
      <FlexCol className="rounded-card bg-neutral-100 p-6 gap-3">
        <Typography type="bold3">Summary</Typography>

        <FlexRow className="justify-between text-navy-600">
          <FlexRow className="gap-1 items-center">
            <Typography type="bold2">3rd party DEX fees</Typography>
            <StandardTooltip width={1} openOnClick={false}>
              <Typography type="medium2" className="text-navy-1000">
                DEX fees and price impact incurred to keep the strategy <br /> at the target multiple after your
                withdrawal. If transaction <br /> cost is high, try withdrawing smaller amounts over time.
              </Typography>
            </StandardTooltip>
          </FlexRow>
          <DisplayMoney
            {...checkAuthentication(isConnected)}
            // {...restCost}
            typography="bold2"
            className="text-navy-1000"
            // {...costData?.cost.dollarAmount}
          />
        </FlexRow>
      </FlexCol>
    </FlexCol>
  );
};
