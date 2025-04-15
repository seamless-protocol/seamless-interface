import { FlexCol } from "@shared";
import { PortfolioSummary } from "./portfolio-summary/Summary";
import { TableContainer } from "./table/TableContainer";
import { NotConnectedWalletGuard } from "../../../common/components/NotConnectedWalletGuard";
import { LegacyPlatformDeprecationBanner } from "../../../../components/banner/LegacyPlatformDeprecationBanner";
import { useFetchUserDepositStrategies } from "../../../../../state/loop-strategy/hooks/useFetchUserDepositStrategies";

export const Dashboard = () => {
  const { data: strategies } = useFetchUserDepositStrategies();

  return (
    <FlexCol className="gap-8">
      <NotConnectedWalletGuard>
        <PortfolioSummary />
        {strategies && strategies.length > 0 ? <LegacyPlatformDeprecationBanner /> : null}
        <TableContainer />
      </NotConnectedWalletGuard>
    </FlexCol>
  );
};
