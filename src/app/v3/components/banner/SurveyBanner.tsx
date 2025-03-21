import { FlexRow } from "@shared";
import { seamlessSurveyUrl } from "@router";
import { Link } from "react-router-dom";

export const SurveyBanner = () => {
  return (
    <div className="flex justify-center px-2 md:px-0">
      <div className="w-full max-w-page-content">
        <div className="flex flex-col justify-center text-center w-full md:flex-row py-4 px-8 bg-[#CDA6FD] rounded-[100px] text-black">
          <FlexRow className="md:gap-1 gap-4 items-center justify-center w-full">
            <p className="text-bold3">
              🔮 Seamless is launching Leverage Tokens! Take a quick DeFi survey for chance to be rewarded with USDC.{" "}
              <Link className="text-bold3 underline" target="_blank" rel="noreferrer" to={seamlessSurveyUrl}>
                LINK
              </Link>{" "}
              🔮
            </p>
          </FlexRow>
        </div>
      </div>
    </div>
  );
};
