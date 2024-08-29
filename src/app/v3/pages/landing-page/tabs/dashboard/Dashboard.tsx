import { useAccount } from "wagmi";
import { FlexCol } from "../../../../../../shared";
import { PortfolioSummary } from "./portfolio-summary/Summary";
import { TableContainer } from "./table/TableContainer";

export const Dashboard = () => {
  const { isConnected } = useAccount();

  return (
    <FlexCol className="gap-8">
      {isConnected && <PortfolioSummary />}
      <TableContainer />
    </FlexCol>
  );
};
