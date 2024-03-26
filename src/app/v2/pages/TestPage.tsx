import { Card, FlexCol, FlexRow, PageContainer } from "@shared";
export const TestPage = () => {
  return (
    <PageContainer className="px-52">
      <FlexCol>
        <FlexRow className="w-full border-b border-b-black">test</FlexRow>
        <div className="bg-neutral-100 px-2">
          <Card>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
          </Card>
          <div className="border border-black">test</div>
        </div>
      </FlexCol>
    </PageContainer>
  );
};
