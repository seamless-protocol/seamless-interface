import "@rainbow-me/rainbowkit/styles.css";

import React from "react";
import ReactDOM from "react-dom/client";
//* * OTHER **/
import "../global.d";
import "./app/config/sentry.config";
//* * WAGMI **/
import { CustomWagmiProvider } from "./app/contexts/CustomWagmiProvider";
//* * REACT QUERY **/
import { CustomQueryClientProvider } from "./app/contexts/CustomQueryClientProvider";
//* * RAINBOW **/
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
//* * SENTRY **/
import * as Sentry from "@sentry/react";
//* * LIFI WIDGET **/
import { FallbackPage, LifiWidgetProvider, LiFiWidgetWrapper } from "@shared";
import { App as AppV2 } from "./app/v2/App";
import { App as AppV3 } from "./app/v3/App";
import { myRainbowkitThemeConfigV2 } from "./app/v2/config/rainbow-modal.config";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={FallbackPage} showDialog>
      <CustomQueryClientProvider>
        <CustomWagmiProvider>
          <RainbowKitProvider theme={myRainbowkitThemeConfigV2}>
            <LifiWidgetProvider>
              {import.meta.env.VITE_STYLE_VERSION === "v3" ? <AppV3 /> : <AppV2 />}
              <LiFiWidgetWrapper />
            </LifiWidgetProvider>
          </RainbowKitProvider>
        </CustomWagmiProvider>
      </CustomQueryClientProvider>
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);
