import { FlexCol } from "@shared";
import { NotConnectedWalletGuard } from "./components/NotConnectedWalletGuard";
import { StakingPage } from "./components/StakingPage";

export const StakingTab = () => {
  return (
    <FlexCol className="gap-8">
      <NotConnectedWalletGuard>
        <StakingPage />
      </NotConnectedWalletGuard>
    </FlexCol>
  );
};
