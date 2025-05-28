import { FlexCol } from "@shared";
import { TableContainer } from "./table/TableContainer";
import { NotConnectedWalletGuard } from "../../../common/components/NotConnectedWalletGuard";
import { LegacyPlatformDeprecationBanner } from "../../../../components/banner/LegacyPlatformDeprecationBanner";
import { useFetchUserDepositStrategies } from "../../../../../state/loop-strategy/hooks/useFetchUserDepositStrategies";
import { NewPortfolioSummary } from "./portfolio-summary/NewSummary";
import { PortfolioSummary } from "./portfolio-summary/Summary";

export const Dashboard = () => {
  const { data: strategies } = useFetchUserDepositStrategies();

  return (
    <FlexCol className="gap-8">
      <NotConnectedWalletGuard>
        {import.meta.env.VITE_LEVERAGE_TOKENS_FEATURE === "true" ? <NewPortfolioSummary /> : <PortfolioSummary />}
        {strategies && strategies.length > 0 ? <LegacyPlatformDeprecationBanner /> : null}
        <TableContainer />
      </NotConnectedWalletGuard>
    </FlexCol>
  );
};
