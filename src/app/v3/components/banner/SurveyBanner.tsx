import { FlexRow, Typography } from "@shared";
import { disourseUrl } from "@router";
import { Link } from "react-router-dom";

export const SurveyBanner = () => {
  return (
    <div className="flex justify-center px-2 md:px-0">
      <div className="w-full max-w-page-content">
        <div className="flex flex-col justify-center text-center w-full md:flex-row py-4 px-8 bg-[#5CDBF0] rounded-[100px] text-black">
          <FlexRow className="md:flex-row flex-col md:gap-1 gap-4 items-center justify-center w-full">
            <Typography type="bold3">📣 Discover Seamless&apos;s vision and plans for the future</Typography>
            <Link className="text-bold3 underline" target="_blank" rel="noreferrer" to={disourseUrl}> here</Link>
            <Typography type="bold3"> !📣</Typography>
          </FlexRow>
        </div>
      </div>
    </div>
  );
};
