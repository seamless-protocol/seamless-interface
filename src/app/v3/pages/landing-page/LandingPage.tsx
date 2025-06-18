import { FlexCol, FlexRow, PageContainer, TabButton, TabContent, TabProvider } from "@shared";
import { Dashboard } from "./tabs/dashboard/Dashboard";
import { StakingTab } from "./tabs/staking/StakingTab";
import { MorphoVaultsTab } from "./tabs/morpho-vaults/MorphoVaultsTab";
import { LeverageTokensTab } from "./tabs/ilms/LeverageTokensTab";

type Tabs = "LeverageTokens" | "Dashboard" | "Staking" | "Vaults";

export const LandingPage = () => {
  return (
    <PageContainer className="flex justify-center py-6 pb-12">
      <TabProvider<Tabs> defaultTab="Vaults">
        {/* todo: responsive */}
        <FlexCol className="gap-1 w-full md:max-w-page-content">
          <FlexRow className="w-full gap-1 border-b-navy-100 border-b-thin overflow-x-auto md:overflow-x-hidden overflow-y-hidden whitespace-nowrap">
            <TabButton<Tabs> data-cy="tab-vaults" tab="Vaults" className="min-w-20 md:min-w-32">
              Vaults
            </TabButton>
            {import.meta.env.VITE_LEVERAGE_TOKENS_FEATURE === "true" && (
              <TabButton<Tabs> data-cy="tab-leverage-tokens" tab="LeverageTokens" className="min-w-[114px] md:min-w-32">
                Leverage Tokens
              </TabButton>
            )}
            {import.meta.env.VITE_STAKING_FEATURE === "true" && (
              <TabButton<Tabs> data-cy="tab-staking" tab="Staking" className="min-w-[70px] md:min-w-32">
                Staking
              </TabButton>
            )}
            <TabButton<Tabs> data-cy="tab-dashboard" tab="Dashboard" className="min-w-24 md:min-w-32">
              Dashboard
            </TabButton>
          </FlexRow>

          <TabContent<Tabs> tab="Vaults">
            <div className="mt-8">
              <MorphoVaultsTab />
            </div>
          </TabContent>
          {import.meta.env.VITE_LEVERAGE_TOKENS_FEATURE === "true" && (
            <TabContent<Tabs> tab="LeverageTokens">
              <div className="mt-8">
                <LeverageTokensTab />
              </div>
            </TabContent>
          )}
          {import.meta.env.VITE_STAKING_FEATURE === "true" && (
            <TabContent<Tabs> tab="Staking">
              <div className="mt-8">
                <StakingTab />
              </div>
            </TabContent>
          )}
          <TabContent<Tabs> tab="Dashboard">
            <div className="mt-8">
              <Dashboard />
            </div>
          </TabContent>
        </FlexCol>
      </TabProvider>
    </PageContainer>
  );
};
