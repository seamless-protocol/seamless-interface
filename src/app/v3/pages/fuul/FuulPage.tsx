import { PageContainer, FlexCol } from "../../../../shared";
import { TestFuulComponent } from "./fuul";

export const FuulPage = () => {
  return (
    <PageContainer className="flex justify-center py-6 pb-12 md:px-0 px-2">
      <FlexCol className="gap-16 w-full md:max-w-page-content">
        <TestFuulComponent />
      </FlexCol>
    </PageContainer>
  );
};
