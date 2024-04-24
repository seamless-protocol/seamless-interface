import "@rainbow-me/rainbowkit/styles.css";

//* * ROUTER **/
import { HashRouter, Routes, Route } from "react-router-dom";
import { RouterConfig } from "@router";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";

//* * PAGES **/

//* * LAYOUT **/
import { ConnectButtonProvider, FallbackPage, FlexCol, PageNotFound } from "@shared";
//* * SENTRY **/
import * as Sentry from "@sentry/react";
import { TestPage } from "./pages/test-page/TestPage";
import { QueryParamProvider } from "use-query-params";
import { Footer } from "./components/footer/Footer";
import { NavigationBar } from "./components/navbar/NavigationBar";

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

export function App() {
  return (
    <Sentry.ErrorBoundary fallback={FallbackPage} showDialog>
      <HashRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <ConnectButtonProvider>
            <NavigationBar />
          </ConnectButtonProvider>
          <FlexCol className="min-h-screen">
            <SentryRoutes>
              <Route path={RouterConfig.Routes.markets} element={<TestPage />} />
              <Route path="*" element={<PageNotFound />} />
            </SentryRoutes>
            <Footer />
          </FlexCol>
        </QueryParamProvider>
      </HashRouter>
    </Sentry.ErrorBoundary>
  );
}
