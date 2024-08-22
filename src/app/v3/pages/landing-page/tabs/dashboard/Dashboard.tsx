import { FlexCol } from "../../../../../../shared";
import { PortfolioSummary } from "./portfolio-summary/Summary";
import { TableContainer } from "./table/TableContainer";

export const Dashboard = () => {
  return (
    <FlexCol className="gap-8">
      <PortfolioSummary />
      <TableContainer />
    </FlexCol>
  );
};
