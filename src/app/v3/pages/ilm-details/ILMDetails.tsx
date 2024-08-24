import { FlexCol, FlexRow, PageContainer } from "@shared";
import { StrategyDetails } from "./components/strategy-details/StrategyDetails";
import { FormContainer } from "./components/forms/FormContainer";

export const ILMDetails = () => {
  return (
    <PageContainer className="flex justify-center py-2 md:py-12">
      <FlexCol className="gap-1 w-full md:max-w-page-content">
        <FlexRow className="w-full gap-8">
          <div className="flex flex-grow">
            <StrategyDetails />
          </div>
          <div className="w-[450px] flex flex-none">
            <FormContainer />
          </div>
        </FlexRow>
      </FlexCol>
    </PageContainer>
  );
};
