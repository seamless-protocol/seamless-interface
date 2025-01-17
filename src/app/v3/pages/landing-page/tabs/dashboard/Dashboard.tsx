import { FlexCol } from "@shared";
import { PortfolioSummary } from "./portfolio-summary/Summary";
import { TableContainer } from "./table/TableContainer";
import { NotConnectedWalletGuard } from "./components/common/NotConnectedWalletGuard";
import { MorphoVaultTableContainer } from "./morpho-vault-table/MorphoVaultTableContainer";

export const Dashboard = () => {

  return (
    <FlexCol className="gap-8">
      <NotConnectedWalletGuard>
        <PortfolioSummary />
        <TableContainer />
        <MorphoVaultTableContainer />
      </NotConnectedWalletGuard>
    </FlexCol>
  );
};
