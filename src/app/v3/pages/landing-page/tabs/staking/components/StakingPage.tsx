import { FlexCol, PageContainer } from "@shared";

import { UnclaimedRewardsBox } from "./UnclaimedRewardsBox";

import { FormContainer } from "./FormContainer";
import { NotConnectedWalletGuard } from "./NotConnectedWalletGuard";

export const StakingPage = () => {
  return (
    <PageContainer className="flex justify-center py-6 pb-12 px-4 md:px-0">
      <FlexCol className="gap-1 w-full md:max-w-page-content">
        <div className="grid grid-rows-1 md:grid-cols-[2fr,1fr] gap-8 w-full items-start">
          <div className="flex-grow">
            <NotConnectedWalletGuard message="Connect your wallet to view your rewards.">
              <UnclaimedRewardsBox />
            </NotConnectedWalletGuard>
          </div>
          <div className="md:sticky top-6 order-1 md:order-2 md:min-w-[460px]">
            <FormContainer />
          </div>
        </div>
      </FlexCol>
    </PageContainer>
  );
};
