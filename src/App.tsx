import "@rainbow-me/rainbowkit/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi"; //, http, createConfig
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IlmPage } from "./app/pages/ilm-page/page";
import { RouterConfig } from "./app/router";
import { IlmDetailsPage } from "./app/pages/ilm-details-page/page";
import { NotificationProvider } from "./shared";
import { LiFiWidgetWrapper } from "./shared/components/lifi/LiFiWidgetWrapper.tsx";
import { NavigationBar } from "./app/components/navbar/NavigationBar.tsx";
import { myRainbowkitThemeConfig } from "./rainbow-modal.config.ts";
import { LifiWidgetProvider } from "./shared/contexts/lifi/LifiWidgetContext.tsx";
import { ConnectButtonProvider } from "./shared/contexts/connect-wallet/ConnectButtonProvider.tsx";
import { rainbowConfig } from "./rainbow-config.ts";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <WagmiProvider config={rainbowConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={myRainbowkitThemeConfig}>
            <NotificationProvider>
              <LifiWidgetProvider>
                <ConnectButtonProvider>
                  <NavigationBar />
                </ConnectButtonProvider>
                <Routes>
                  <Route path={RouterConfig.Routes.ilm} element={<IlmPage />} />
                  <Route
                    path={RouterConfig.Routes.ilmDetails}
                    element={<IlmDetailsPage />}
                  />
                </Routes>
                <LiFiWidgetWrapper />
              </LifiWidgetProvider>
            </NotificationProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>
  );
}

export default App;
