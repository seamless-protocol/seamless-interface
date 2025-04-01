import { useAccount } from "wagmi";
import { Divider, FlexCol, FlexRow, formatAddressToDisplayable, Typography } from "@shared";
import { GovInfoCardDataPoint } from "./GovInfoCardDataPoint";
import { useFetchSEAMAssetBalances } from "../hooks/useFetchSeamBalances";
import { Link } from "react-router-dom";
import { legacyGovUrl } from "@router";

export const GovInfoCard = () => {
  const { address } = useAccount();
  const { data: { seamBalance, esSeamBalance, stkSeamBalance, sum } = {}, ...rest } = useFetchSEAMAssetBalances();

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
            viewValue={sum?.tokenAmount.viewValue}
            {...rest}
          />

          <GovInfoCardDataPoint label="SEAM" viewValue={seamBalance?.tokenAmount.viewValue} {...rest} />

          <GovInfoCardDataPoint label="esSEAM" viewValue={esSeamBalance?.tokenAmount.viewValue} {...rest} />

          <GovInfoCardDataPoint label="stkSEAM" viewValue={stkSeamBalance?.tokenAmount.viewValue} {...rest} />
        </FlexRow>
        <Divider />
        <FlexCol className="gap-4">
          <Typography type="medium3">
            Use this page for delegation, this is the only place to delegate stkSEAM tokens, but use{" "}
            <Link to={legacyGovUrl} target="_blank" className="underline">
              legacy page
            </Link>{" "}
            for voting.
          </Typography>
          <Typography type="bold1"> Voting will soon be available here as well.</Typography>
        </FlexCol>
      </div>
    </div>
  );
};
