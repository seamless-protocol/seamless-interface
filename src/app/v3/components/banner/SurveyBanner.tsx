import { FlexRow, Typography } from "@shared";

export const SurveyBanner = () => {
  return (
    <div className="flex justify-center px-2 md:px-0">
      <div className="w-full max-w-page-content">
        <div className="flex flex-col justify-center text-center w-full md:flex-row py-4 px-8 bg-lime-500 rounded-[100px] text-black">
          <FlexRow className="md:flex-row flex-col md:gap-0 gap-4 items-center justify-between w-full">
            <Typography type="bold3">📣 Stay tuned, Community Blog Post coming soon! 📣</Typography>
          </FlexRow>
        </div>
      </div>
    </div>
  );
};
