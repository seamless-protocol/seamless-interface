import "@rainbow-me/rainbowkit/styles.css";

//** ROUTER **/
import { HashRouter, Routes, Route } from "react-router-dom";
import { RouterConfig } from "@router";
//** PAGES **/
import { IlmPage } from "./app/pages/ilm-page/page";
import { IlmDetailsPage } from "./app/pages/ilm-details-page/page";
//** LAYOUT **/
import {
  ConnectButtonProvider,
  FallbackPage,
  FlexCol,
  PageNotFound,
} from "@shared";
import { NavigationBar } from "./app/components/navbar/NavigationBar.tsx";
import { Footer } from "./app/components/footer/Footer.tsx";
//** SENTRY **/
import * as Sentry from "@sentry/react";
const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

export function App() {
  return (
    <Sentry.ErrorBoundary fallback={FallbackPage} showDialog>
      <HashRouter>
        <FlexCol className="min-h-screen">
          <ConnectButtonProvider>
            <NavigationBar />
          </ConnectButtonProvider>
          <SentryRoutes>
            <Route path={RouterConfig.Routes.markets} element={<IlmPage />} />
            <Route
              path={RouterConfig.Routes.ilmDetails}
              element={<IlmDetailsPage />}
            />
            <Route path="*" element={<PageNotFound />} />;
          </SentryRoutes>
          <Footer />
        </FlexCol>
      </HashRouter>
    </Sentry.ErrorBoundary>
  );
}
