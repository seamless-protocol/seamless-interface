import { Card, PageContainer } from "@shared";

export const TestPage = () => {
  return (
    <PageContainer>
      <div className="bg-neutral-100 px-2">
        <Card>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
        </Card>
        <div className="border border-black">test</div>
      </div>
    </PageContainer>
  );
};
