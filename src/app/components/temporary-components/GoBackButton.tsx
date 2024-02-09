import { useNavigate } from "react-router-dom";
import { FlexRow, Icon, Typography } from "../../../shared";

import leftArrow from "../../../assets/common/left-arrow.svg";

export const GoBackButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="box-border border-solid border-divider border-thin
    rounded px-3 py-1.5  transition-all duration-250 ease-in-out 
  bg-primary-main hover:bg-background-header"
        onClick={() => navigate(-1)}
      >
        <FlexRow className="gap-2">
          <Icon src={leftArrow} alt="left-arrow" width={20} height={12} />
          <Typography type="secondary14" className="text-white">
            Go Back
          </Typography>
        </FlexRow>
      </button>
    </div>
  );
};
