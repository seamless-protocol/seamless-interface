import { FlexRow } from "@shared";
import { Link } from "react-router-dom";

const windingDownUrl = "https://x.com/SeamlessFi/status/2041572728239747558";

export const NewUIBanner = () => {
  return (
    <div className="flex justify-center px-2 md:px-0">
      <div className="w-full max-w-page-content">
      <div className="flex flex-col justify-center text-center w-full py-4 px-8 bg-warning-200 rounded-[100px] text-black">
          <FlexRow className="flex-col gap-2 items-center justify-center w-full">
            <p className="text-bold3">
              Seamless Protocol is winding down.{"  "}
              <Link
                className="text-bold3 underline"
                target="_blank"
                rel="noreferrer"
                to={windingDownUrl}
              >
                Read the announcement
              </Link>
            </p>
            <p className="text-bold3">
              Removal of all assets from the platform is strongly recommended by June 30, 2026. Once the UI is offline, recovering your
              assets will require manual contract interaction, though possible, it is complex and you will need to do so without
              support.
            </p>
          </FlexRow>
        </div>
      </div>
    </div>
  );
};
