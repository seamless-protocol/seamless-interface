import { FlexRow } from "@shared";
import { legacyPlatformDeprecationNoticeUrl } from "@router";
import { Link } from "react-router-dom";

export const LegacyPlatformDeprecationBanner = () => {
  return (
    <div className="flex justify-center px-2 md:px-0">
      <div className="w-full max-w-page-content">
        <div className="flex flex-col justify-center text-center w-full md:flex-row py-4 px-8 bg-warning-200 rounded-[100px] text-black">
          <FlexRow className="md:gap-1 gap-4 items-center justify-center w-full">
            <p className="text-bold3">
              ILMs will have leverage disabled on April 11th, 2025. More details{" "}
              <Link className="text-bold3 underline" target="_blank" rel="noreferrer" to={legacyPlatformDeprecationNoticeUrl}>
                HERE
              </Link>
            </p>
          </FlexRow>
        </div>
      </div>
    </div>
  );
};