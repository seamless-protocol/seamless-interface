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
import { useFetchAllAssets } from "../state/common/hooks/useFetchAllAssets";
import { Footer } from "./components/footer/Footer";

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

export function App() {
  useFetchAllAssets();

  return (
    <Sentry.ErrorBoundary fallback={FallbackPage} showDialog>
      <HashRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <ConnectButtonProvider>todo: new navbar</ConnectButtonProvider>

          <FlexCol className="min-h-screen">
            <NotificationProvider>
              <SentryRoutes>
                <Route path={RouterConfig.Routes.markets} element={<div>todo: new page</div>} />
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
