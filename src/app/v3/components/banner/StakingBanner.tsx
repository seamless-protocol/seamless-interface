import { FlexRow } from "@shared";
import { RouterConfig } from "@router";
import { Link } from "react-router-dom";

export const StakingBanner = () => {
  return (
    <div className="flex justify-center px-2 md:px-0">
      <div className="w-full max-w-page-content">
        <div className="flex flex-col justify-center text-center w-full md:flex-row py-4 px-8 bg-[#4F68F7] rounded-[100px] text-white">
          <FlexRow className="md:gap-1 gap-4 items-center justify-center w-full">
            <p className="text-bold3">
              🥩 SEAM Staking is now live! Earn Protocol Fees and Rewards via staking. Check it out{" "}
              <Link className="text-bold3 underline" to={RouterConfig.Routes.stakingTab}>
                here.
              </Link>{" "}
              🥩
            </p>
          </FlexRow>
        </div>
      </div>
    </div>
  );
};
