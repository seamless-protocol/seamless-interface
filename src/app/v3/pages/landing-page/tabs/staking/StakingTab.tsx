import { FlexCol } from "@shared";
import { StakingPage } from "./components/StakingPage";
import { NotConnectedWalletGuard } from "../../../common/components/NotConnectedWalletGuard";

export const StakingTab = () => {
  return (
    <FlexCol className="gap-8">
      <NotConnectedWalletGuard>
        <StakingPage />
      </NotConnectedWalletGuard>
    </FlexCol>
  );
};
