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
import { Footer } from "./components/footer/Footer";
import { NavigationBar } from "./components/navbar/NavigationBar";
import { useFetchAllAssets } from "../state/common/hooks/useFetchAllAssets";
import { useConnect } from "wagmi";
import { useEffect } from "react";
import { testConnector } from "../config/demoConnector/testConnector";
import { mock } from "wagmi/connectors";
import { connectors } from "../config/rainbow.config";

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

export function App() {
  useFetchAllAssets();
  const { connect } = useConnect();

  useEffect(() => {
    connect({
      // connector: mock({ accounts: ["0x818DB96e1b5c64bBE6307c95473E313c743FF7d0"] }),
      connector: testConnector,
    });
  }, []);

  return (
    <Sentry.ErrorBoundary fallback={FallbackPage} showDialog>
      <HashRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <ConnectButtonProvider>
            <NavigationBar />
          </ConnectButtonProvider>
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
