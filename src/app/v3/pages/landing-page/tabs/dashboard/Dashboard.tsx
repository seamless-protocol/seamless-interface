import { FlexCol } from "@shared";
import { TableContainer } from "./table/TableContainer";
import { NotConnectedWalletGuard } from "../../../common/components/NotConnectedWalletGuard";
import { LegacyPlatformDeprecationBanner } from "../../../../components/banner/LegacyPlatformDeprecationBanner";
import { useFetchUserDepositStrategies } from "../../../../../data/ilmv1-deprecated/queries/useFetchUserDepositStrategies";
import { PortfolioSummaryV2 } from "./portfolio-summary/PortfolioSummaryV2";

export const Dashboard = () => {
  const { data: strategies } = useFetchUserDepositStrategies();

  return (
    <FlexCol className="gap-8">
      <NotConnectedWalletGuard>
        <PortfolioSummaryV2 />
        {strategies && strategies.length > 0 ? <LegacyPlatformDeprecationBanner /> : null}
        <TableContainer />
      </NotConnectedWalletGuard>
    </FlexCol>
  );
};
