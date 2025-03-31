import { useAccount } from "wagmi";
import { Divider, FlexCol, FlexRow, formatAddressToDisplayable, Typography } from "@shared";
import { GovInfoCardDataPoint } from "./GovInfoCardDataPoint";

export const GovInfoCard = () => {
  const { address } = useAccount();
  return (
    <div>
      <div className="p-10 flex flex-col bg-neutral-0 rounded-xl gap-5 border border-b-100 h-full justify-between">
        <FlexCol>
          <Typography type="medium3">Your address: {formatAddressToDisplayable(address)}</Typography>
        </FlexCol>
        <Divider />
        <FlexRow className="justify-between">
          <GovInfoCardDataPoint
            label="Voting power"
            tooltip={
              <>
                Your voting power is based on the amount of SEAM + esSEAM + stkSEAM <br /> that has been delegated to
                you (you must delegate to yourself to vote with your balance). <br /> Use it to vote for or against
                active proposals.
              </>
            }
            viewValue="0.00"
          />

          <GovInfoCardDataPoint label="SEAM" viewValue="0.00" />

          <GovInfoCardDataPoint label="esSEAM" viewValue="0.00" />

          <GovInfoCardDataPoint label="stkSEAM" viewValue="0.00" />
        </FlexRow>
      </div>
    </div>
  );
};
