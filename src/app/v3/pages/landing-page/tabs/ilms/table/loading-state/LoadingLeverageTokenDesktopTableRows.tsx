import { LeverageTokenDesktopTableRow } from "../ILMDesktopTableRow";
import { propsMock } from "./mock";

export const LoadingLeverageTokenDesktopTableRows: React.FC<{
  rows?: number;
}> = ({ rows = 2 }) => {
  return Array.from({ length: rows }, (_, i) => <LeverageTokenDesktopTableRow key={i} leverageToken={propsMock} />);
};
