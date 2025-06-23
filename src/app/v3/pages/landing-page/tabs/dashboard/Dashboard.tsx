import { FlexCol } from "@shared";
import { TableContainer } from "./table/TableContainer";
import { NotConnectedWalletGuard } from "../../../common/components/NotConnectedWalletGuard";
import { LegacyPlatformDeprecationBanner } from "../../../../components/banner/LegacyPlatformDeprecationBanner";
import { useFetchUserDepositStrategies } from "../../../../../data/ilmv1-deprecated/queries/useFetchUserDepositStrategies";
import { PortfolioSummaryV2 } from "./portfolio-summary/PortfolioSummaryV2";
import { PortfolioSummary } from "./portfolio-summary/Summary";

export const Dashboard = () => {
  const { data: strategies } = useFetchUserDepositStrategies();

  return (
    <FlexCol className="gap-8">
      <NotConnectedWalletGuard>
        {import.meta.env.VITE_LEVERAGE_TOKENS_FEATURE === "true" ? <PortfolioSummaryV2 /> : <PortfolioSummary />}
        {strategies && strategies.length > 0 ? <LegacyPlatformDeprecationBanner /> : null}
        <TableContainer />
      </NotConnectedWalletGuard>
    </FlexCol>
  );
};
