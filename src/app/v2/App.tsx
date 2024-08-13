//* * ROUTER **/
import { HashRouter, Routes, Route } from "react-router-dom";
import { RouterConfig } from "@router";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";

//* * PAGES **/

//* * LAYOUT **/
import { ConnectButtonProvider, FallbackPage, FlexCol, NotificationProvider, PageNotFound } from "@shared";
//* * SENTRY **/
import * as Sentry from "@sentry/react";
import { LandingPage } from "./pages/test-page/LandingPage";
import { QueryParamProvider } from "use-query-params";
import { NavigationBar } from "./components/navbar/NavigationBar";
import { useFetchAllAssets } from "../state/common/hooks/useFetchAllAssets";
import { SurveyBanner } from "./components/navbar/SurveyBanner";
import { Footer } from "./components/footer/Footer";

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

export function App() {
  useFetchAllAssets();

  return (
    <Sentry.ErrorBoundary fallback={FallbackPage} showDialog>
      <HashRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <ConnectButtonProvider>
            <NavigationBar />
          </ConnectButtonProvider>
          <div className="mt-2 flex w-full justify-center">
            <SurveyBanner />
          </div>

          <FlexCol className="min-h-screen">
            <NotificationProvider>
              <SentryRoutes>
                <Route path={RouterConfig.Routes.markets} element={<LandingPage />} />
                <Route path="*" element={<PageNotFound />} />
              </SentryRoutes>
            </NotificationProvider>
            <Footer />
          </FlexCol>
        </QueryParamProvider>
      </HashRouter>
    </Sentry.ErrorBoundary>
  );
}
