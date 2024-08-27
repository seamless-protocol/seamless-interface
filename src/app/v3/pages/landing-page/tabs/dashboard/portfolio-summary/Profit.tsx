import { FlexRow, Icon, Typography } from "../../../../../../../shared";
import polygonSvg from "@assets/common/polygon.svg";

export const Profit = () => {
  return (
    <FlexRow className="flex bg-green-100 rounded-tag p-1  justify-center gap-1 max-w-52">
      <Icon src={polygonSvg} alt="polygon" width={16} height={16} />
      <Typography type="bold4" className="text-success-900">
        $550.52 (0.89%)
      </Typography>
    </FlexRow>
  );
};
