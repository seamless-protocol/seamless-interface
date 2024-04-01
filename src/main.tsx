import React from "react";
import ReactDOM from "react-dom/client";
//* * OTHER **/
import "../global.d";
import "./app/config/sentry.config";
//* * WAGMI **/
import { rainbowConfig } from "./app/config/rainbow.config";
import { WagmiProvider } from "wagmi";
//* * REACT QUERY **/
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//* * RAINBOW **/
import { myRainbowkitThemeConfig } from "./app/v1/config/rainbow-modal.config";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
//* * SENTRY **/
import * as Sentry from "@sentry/react";
//* * LIFI WIDGET **/
import { FallbackPage, LifiWidgetProvider, LiFiWidgetWrapper, NotificationProvider } from "@shared";
import { App as AppV1 } from "./app/v1/App";
import { App as AppV2 } from "./app/v2/App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={FallbackPage} showDialog>
      <WagmiProvider config={rainbowConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={myRainbowkitThemeConfig}>
            <NotificationProvider>
              <LifiWidgetProvider>
                {import.meta.env.VITE_STYLE_VERSION === "v2" ? <AppV2 /> : <AppV1 />}
                <LiFiWidgetWrapper />
              </LifiWidgetProvider>
            </NotificationProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);
