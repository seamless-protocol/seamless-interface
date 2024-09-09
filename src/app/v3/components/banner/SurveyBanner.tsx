import { FlexRow, Typography } from "@shared";
import { Link } from "react-router-dom";
import { seamlessSurveyUrl } from "@router";

export const SurveyBanner = () => {
  return (
    <div className="flex justify-center px-2 md:px-0">
      <div className="w-full max-w-page-content">
        <div className="flex flex-col justify-center text-center w-full md:flex-row py-4 px-8 bg-orange-400 rounded-[100px] text-black">
          <FlexRow className="md:flex-row flex-col md:gap-0 gap-4 items-center justify-between w-full">
            <Typography type="bold3">
              📣 Share Your thoughts! Help Seamless enhance ILMs by taking a quick 5-minute survey. 👉🏿{" "}
              <Link to={seamlessSurveyUrl} className="underline" target="_blank" rel="noreferrer noopen">
                Take the Survey Here
              </Link>
            </Typography>
          </FlexRow>
        </div>
      </div>
    </div>
  );
};
