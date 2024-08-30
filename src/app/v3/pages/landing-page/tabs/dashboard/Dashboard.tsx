import { FlexCol } from "@shared";
import { PortfolioSummary } from "./portfolio-summary/Summary";
import { TableContainer } from "./table/TableContainer";
import { NotConnectedWalletGuard } from "./components/NotConnectedWalletGuard";

export const Dashboard = () => {
  return (
    <FlexCol className="gap-8">
      <NotConnectedWalletGuard>
        <PortfolioSummary />
        <TableContainer />
      </NotConnectedWalletGuard>
    </FlexCol>
  );
};
