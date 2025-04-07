//* * ROUTER **/
import { HashRouter, Routes, Route } from "react-router-dom";
import { RouterConfig } from "@router";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";

//* * PAGES **/

//* * LAYOUT **/
import { FallbackPage, FlexCol, NetworkListener, NotificationProvider, PageNotFound } from "@shared";
//* * SENTRY **/
import * as Sentry from "@sentry/react";
import { QueryParamProvider } from "use-query-params";
import { LandingPage } from "./pages/landing-page/LandingPage";
import { Footer } from "./components/footer/Footer";
import { ILMDetails } from "./pages/ilm-details/ILMDetails";
import { NavigationBar } from "./components/navigation-bar/NavigationBar";
import { Audited } from "./components/banner/Audited";
import { StakingBanner } from "./components/banner/StakingBanner";
import { ApolloProvider } from "@apollo/client";
import { MorphoVaultDetails } from "./pages/morpho-vault-details/MorphoVaultDetails";
import { GovernancePage } from "./pages/governance/GovernancePage";
import { getMorphoApolloClient } from "../config/apollo-clients";
import { TestFuul } from "../config/fuul";
import { useEffect } from "react";

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

export function App() {
  useEffect(() => {
    TestFuul();
  }, []);
  return (
    <Sentry.ErrorBoundary fallback={FallbackPage} showDialog>
      <ApolloProvider client={getMorphoApolloClient()}>
        <HashRouter>
          <QueryParamProvider adapter={ReactRouter6Adapter}>
            <NavigationBar />
            <div className="flex flex-col gap-4">
              {import.meta.env.VITE_STAKING_FEATURE === "true" && <StakingBanner />}
              <Audited />
            </div>

            <FlexCol className="min-h-screen">
              <NotificationProvider>
                <NetworkListener>
                  <SentryRoutes>
                    <Route path={RouterConfig.Routes.landingPage} element={<LandingPage />} />
                    <Route path={RouterConfig.Routes.ilmDetailsv3} element={<ILMDetails />} />
                    <Route path={RouterConfig.Routes.morphoVaultDetailsv3} element={<MorphoVaultDetails />} />
                    <Route path={RouterConfig.Routes.governance} element={<GovernancePage />} />
                    <Route path="*" element={<PageNotFound />} />
                  </SentryRoutes>
                </NetworkListener>
              </NotificationProvider>
              <Footer />
            </FlexCol>
          </QueryParamProvider>
        </HashRouter>
      </ApolloProvider>
    </Sentry.ErrorBoundary>
  );
}
