import { Card, FlexCol, FlexRow, PageContainer, TabButton } from "@shared";
import { TabProvider } from "../../../shared/contexts/tab-context/TabContext";

type Tabs = "Earn" | "Borrow" | "My Positions";

export const TestPage = () => {
  return (
    <PageContainer className="px-52">
      <TabProvider<Tabs> defaultTab="Earn" disableUrlSyncing={false}>
        <FlexCol className="gap-1 w-full">
          <FlexRow className="w-full gap-1  border-b-navy-100 border-b-thin">
            <TabButton<Tabs> tab="Earn">Earn</TabButton>
            <TabButton<Tabs> tab="Borrow">Borrow</TabButton>
            <TabButton<Tabs> tab="My Positions">My Positions</TabButton>
          </FlexRow>
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
      </TabProvider>
    </PageContainer>
  );
};
