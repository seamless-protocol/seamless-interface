import { FlexCol, PageContainer } from "@shared";

import { FormContainer } from "./FormContainer";
import { UnclaimedRewardsBox } from "../../../../common/components/UnclaimedRewardsBox";
import { useFetchViewAllUserRewards } from "../../../../../../statev3/common/hooks/useFetchViewAllUserRewards";
import { rewardsAccruingAssets } from "../../../../../../statev3/settings/config";
import { RewardsTableContainer } from "./rewards-table/RewardsTableContainer";

export const StakingPage = () => {
  const { data, ...rest } = useFetchViewAllUserRewards(rewardsAccruingAssets);

  return (
    <PageContainer className="flex justify-center py-6 pb-12 px-4 md:px-0">
      <FlexCol className="gap-1 w-full md:max-w-page-content">
        <div className="grid grid-rows-1 md:grid-cols-[2fr,1fr] gap-8 w-full items-start">
          <div className="flex-col flex  gap-4">
            <UnclaimedRewardsBox {...rest} data={data} />
            <RewardsTableContainer />
          </div>
          <div className="md:sticky top-6 order-1 md:order-2 md:min-w-[460px]">
            <FormContainer />
          </div>
        </div>
      </FlexCol>
    </PageContainer>
  );
};
