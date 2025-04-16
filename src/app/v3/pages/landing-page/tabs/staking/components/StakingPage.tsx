import { FlexCol, PageContainer } from "@shared";
import { FormContainer } from "./FormContainer";
import { UnclaimedRewardsBoxWrapper } from "./UnclaimedRewardsBoxWrapper";
import { RewardsTableContainer } from "./rewards-table/RewardsTableContainer";
import { CurrentHoldings } from "../../../../../components/current-holdings/CurrentHoldings";
import { STAKED_SEAM_ADDRESS } from "@meta";
import { StakingStats } from "./StakingStats";
import { StakingDetails } from "./StakingDetails";
import { useAccount } from "wagmi";

export const StakingPage = () => {
  const { isConnected } = useAccount();

  return (
    <PageContainer className="flex justify-center py-6 pb-12 px-4 md:px-0">
      <FlexCol className="gap-1 w-full md:max-w-page-content">
        <div className="flex flex-col md:grid grid-rows-1 md:grid-cols-[2fr,1fr] gap-8 w-full items-start">
          <div className="flex flex-col gap-9">
            {isConnected && (
              <>
                <CurrentHoldings address={STAKED_SEAM_ADDRESS} displayProfit={false} />
                <UnclaimedRewardsBoxWrapper />
              </>
            )}
            <StakingStats />
            <RewardsTableContainer />
            <StakingDetails />
          </div>
          <div className="order-first md:order-2 md:sticky top-6 md:min-w-[460px] max-w-full">
            <FormContainer />
          </div>
        </div>
      </FlexCol>
    </PageContainer>
  );
};
