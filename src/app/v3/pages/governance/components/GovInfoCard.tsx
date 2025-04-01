import { useAccount } from "wagmi";
import { Divider, FlexCol, FlexRow, formatAddressToDisplayable, Typography } from "@shared";
import { GovInfoCardDataPoint } from "./GovInfoCardDataPoint";
import { useFetchSEAMAssetBalances } from "../hooks/useFetchSeamBalances";
import { useFetchDelegates } from "../../../../statev3/governance/queries/delegates/FetchDelegates.hook";

export const GovInfoCard = () => {
  const { address } = useAccount();
  const { data: { seamBalance, esSeamBalance, stkSeamBalance } = {}, ...rest } = useFetchSEAMAssetBalances();
  const { data: { userVotingPower } = {}, ...delegRest } = useFetchDelegates();

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
            viewValue={userVotingPower?.viewValue}
            {...delegRest}
          />

          <GovInfoCardDataPoint label="SEAM" viewValue={seamBalance?.tokenAmount.viewValue} {...rest} />

          <GovInfoCardDataPoint label="esSEAM" viewValue={esSeamBalance?.tokenAmount.viewValue} {...rest} />

          <GovInfoCardDataPoint label="stkSEAM" viewValue={stkSeamBalance?.tokenAmount.viewValue} {...rest} />
        </FlexRow>
      </div>
    </div>
  );
};
