import { FlexRow } from "@shared";
import { newUiUrl } from "@router";
import { Link } from "react-router-dom";

export const NewUIBanner = () => {
  return (
    <div className="flex justify-center px-2 md:px-0">
      <div className="w-full max-w-page-content">
        <div className="flex flex-col justify-center text-center w-full md:flex-row py-4 px-8 bg-warning-200 rounded-[100px] text-black">
          <FlexRow className="md:gap-1 gap-4 items-center justify-center w-full">
            <p className="text-bold3">
              Seamless has launched a new UI! As all features migrate to the new UI, this UI will be deprecated. See the new UI {" "}
              <Link
                className="text-bold3 underline"
                target="_blank"
                rel="noreferrer"
                to={newUiUrl}
              >
                HERE
              </Link>
            </p>
          </FlexRow>
        </div>
      </div>
    </div>
  );
};
