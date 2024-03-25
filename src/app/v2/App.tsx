import "@rainbow-me/rainbowkit/styles.css";

//** ROUTER **/
import { HashRouter, Routes, Route } from "react-router-dom";
import { RouterConfig } from "@router";
//** PAGES **/

//** LAYOUT **/
import { FallbackPage, FlexCol, PageNotFound } from "@shared";
//** SENTRY **/
import * as Sentry from "@sentry/react";
import { TestPage } from "./pages/TestPage";
import { useEffect } from "react";
const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

export function App() {
  useEffect(() => {
    // Read the environment variable
    const styleVersion = import.meta.env.VITE_STYLE_VERSION;
    const themeClass = styleVersion === "v2" ? "lightv2" : "light";
    document.body.classList.add(themeClass);
  }, []);

  return (
    <Sentry.ErrorBoundary fallback={FallbackPage} showDialog>
      <HashRouter>
        <FlexCol className="min-h-screen ">
          <SentryRoutes>
            <Route path={RouterConfig.Routes.markets} element={<TestPage />} />
            <Route path="*" element={<PageNotFound />} />
          </SentryRoutes>
        </FlexCol>
      </HashRouter>
    </Sentry.ErrorBoundary>
  );
}
