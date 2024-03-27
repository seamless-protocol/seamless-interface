import {
  FlexCol,
  FlexRow,
  PageContainer,
  TabButton,
  TabContent,
} from "@shared";
import { TabProvider } from "../../../shared/contexts/tab-context/TabContext";
import { EarnTab } from "./tabs/earn-tab/EarnTab";

type Tabs = "Earn" | "Borrow" | "My Positions";

export const TestPage = () => {
  return (
    <PageContainer className="flex justify-center">
      <TabProvider<Tabs> defaultTab="Earn" disableUrlSyncing={false}>
        {/* todo: responsive */}
        <FlexCol className="gap-1 w-full max-w-[1020px]">
          <FlexRow className="w-full gap-1 border-b-navy-100 border-b-thin">
            <TabButton<Tabs> tab="Earn">Earn</TabButton>
            <TabButton<Tabs> tab="Borrow">Borrow</TabButton>
            <TabButton<Tabs> tab="My Positions">My Positions</TabButton>
          </FlexRow>

          <TabContent<Tabs> tab="Earn">
            <div className="mt-8">
              <EarnTab />
            </div>
          </TabContent>
        </FlexCol>
      </TabProvider>
    </PageContainer>
  );
};
