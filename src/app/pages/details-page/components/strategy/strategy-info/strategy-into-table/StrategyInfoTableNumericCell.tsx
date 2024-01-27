import LoadingComponent from "../../../../../../components/loading/LoadingComponent";
import StrategyInfoNumericContent from "./StrategyInfoTableNumericContent";

interface StrategyInfoTableNumericCellProps {
  isLoading: boolean;
  primaryValue: string;
  secondaryValue?: string;
}

function StrategyInfoTableNumericCell({
  isLoading,
  primaryValue,
  secondaryValue,
}: StrategyInfoTableNumericCellProps) {
  return isLoading ? (
    <LoadingComponent size="2rem" />
  ) : (
    <StrategyInfoNumericContent
      primaryValue={primaryValue}
      secondaryValue={secondaryValue}
    />
  );
}

export default StrategyInfoTableNumericCell;
