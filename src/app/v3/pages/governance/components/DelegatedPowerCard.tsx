import { FlexCol, Typography } from "@shared";
import { DelegateModal } from "./DelegateModal";
import { Link } from "react-router-dom";
import { delegateUrl } from "@router";

export const DelegatedPowerCard = () => {
  return (
    <div>
      <div className="p-10 flex flex-col bg-neutral-0 rounded-xl gap-5 border border-b-100 h-full justify-between">
        <FlexCol className="gap-10">
          <FlexCol className="gap-4">
            <Typography type="bold5">Delegated power</Typography>

            <Typography type="regular3">
              All SEAM tokens have voting power, but in order to activate this voting power, SEAM/esSEAM/stkSEAM must
              first be delegated. <br />
              <br /> Note: Delegation does not transfer token ownership, it only grants “Voting Power” to the delegated
              address. You can either self-delegate or delegate this voting power to others and you can change your
              delegation at anytime. <br />
              <br />
              To view active community members who are interested in receiving delegation, click{" "}
              <Link to={delegateUrl} className="underline text-blue-700" target="_blank" rel="noopener noreferrer">
                here
              </Link>
              .
            </Typography>
          </FlexCol>
          <Typography type="medium3">You have no SEAM/esSEAM/stkSEAM to delegate.</Typography>
          <DelegateModal />
        </FlexCol>
      </div>
    </div>
  );
};
