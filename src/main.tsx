import React from "react";
import ReactDOM from "react-dom/client";
//** OTHER **/
import "../global.d.ts";
import "./app/config/sentry.config.ts";
//** WAGMI **/
import { rainbowConfig } from "./app/config/rainbow.config.ts";
import { WagmiProvider } from "wagmi";
//** REACT QUERY **/
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//** RAINBOW **/
import { myRainbowkitThemeConfig } from "./app/config/rainbow-modal.config.ts";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
//** SENTRY **/
import * as Sentry from "@sentry/react";
//** LIFI WIDGET **/
import {
  FallbackPage,
  LifiWidgetProvider,
  LiFiWidgetWrapper,
  NotificationProvider,
} from "@shared";
import App from "./App.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={FallbackPage} showDialog>
      <WagmiProvider config={rainbowConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={myRainbowkitThemeConfig}>
            <NotificationProvider>
              <LifiWidgetProvider>
                <App />
                <LiFiWidgetWrapper />
              </LifiWidgetProvider>
            </NotificationProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);
