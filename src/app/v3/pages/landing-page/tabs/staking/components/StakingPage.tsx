import { FlexCol, FlexRow, PageContainer } from "@shared";
import { useNavigate, useParams } from "react-router-dom";
import { UnclaimedRewardsBox } from "./UnclaimedRewardsBox";

import { Address } from "viem";

import { useAccount } from "wagmi";
import { FormContainer } from "./FormContainer";

export const StakingPage = () => {
  //TODO: Cleanup unused
  const { isConnected } = useAccount();
  const address = "0x0fb8b28d18889b121cdd1ef82a88e1ac1540f284";
  const vault = address as Address | undefined;

  return (
    <PageContainer className="flex justify-center py-6 pb-12 px-4 md:px-0">
      <FlexCol className="gap-1 w-full md:max-w-page-content">
        <div className="grid grid-rows-1 md:grid-cols-[2fr,1fr] gap-8 w-full items-start border border">
          <div className="flex-grow">
            <UnclaimedRewardsBox />
          </div>
          <div className="md:sticky top-6 order-1 md:order-2 md:min-w-[460px]">
              <FormContainer />
          </div>
        </div>
      </FlexCol>
    </PageContainer>
  );
};