import { LeverageTokenMobileTableRow } from "../ILMMobileTableRow";
import { propsMock } from "./mock";

export const LoadingLeverageTokenMobileTableRows: React.FC<{
  rows?: number;
}> = ({ rows = 5 }) => {
  return Array.from({ length: rows }, (_, i) => <LeverageTokenMobileTableRow key={i} leverageToken={propsMock} />);
};
