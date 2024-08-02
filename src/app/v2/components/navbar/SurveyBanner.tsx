import { Typography } from "@shared";
import { Link } from "react-router-dom";
import { SeamlessSurveyUrl } from "@router";

export const SurveyBanner = () => {
  return (
    <div className="px-2 md:px-0 md:w-[65%]">
      <div className="flex flex-col justify-center text-center w-full md:flex-row py-4 px-8 bg-blueGradient rounded-[100px] text-white">
        <Typography type="bold3">
          📣 Share Your thoughts! Help Seamless enhance ILMs by taking a quick 5-minute survey. 👉{" "}
          <Link to={SeamlessSurveyUrl} className="underline" target="_blank" rel="noreferrer noopen">
            Take the Survey Here
          </Link>
        </Typography>
      </div>
    </div>
  );
};
