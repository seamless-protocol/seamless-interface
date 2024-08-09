//* * ROUTER **/
import { HashRouter, Routes, Route } from "react-router-dom";
import { RouterConfig } from "@router";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";

//* * PAGES **/

//* * LAYOUT **/
import { ConnectButtonProvider, FallbackPage, FlexCol, NotificationProvider, PageNotFound } from "@shared";
//* * SENTRY **/
import * as Sentry from "@sentry/react";
import { QueryParamProvider } from "use-query-params";
import { Footer } from "./components/footer/Footer";
import { NavigationBar } from "./components/navbar/NavigationBar";
import { SurveyBanner } from "./components/navbar/SurveyBanner";
import { LandingPageRedesign } from "./pages/landing-page-redesign/LandingPageRedesign";
import { useFetchAllStrategies } from "../statev3/common/hooks/useFetchAllStrategies";

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

export function App() {
  useFetchAllStrategies();

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
                <Route path={RouterConfig.Routes.markets} element={<LandingPageRedesign />} />
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
