import { FlexCol, FlexRow, PageContainer } from "@shared";
import { StrategyDetails } from "./components/strategy-details/StrategyDetails";
import { StrategyStats } from "./components/strategy-details/strategy-stats/StrategyStats";

export const ILMDetails = () => {
  return (
    <PageContainer className="flex justify-center py-2 md:py-12">
      <FlexCol className="gap-1 w-full md:max-w-page-content">
        <FlexRow className="w-full gap-8">
          <div className="w-2/3">
            <StrategyStats />
            <StrategyDetails />
          </div>
          <div className="w-1/3">todo: form</div>
        </FlexRow>
      </FlexCol>
    </PageContainer>
  );
};
