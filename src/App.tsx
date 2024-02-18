import "@rainbow-me/rainbowkit/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi"; //, http, createConfig
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { injected, safe } from "wagmi/connectors";
import { IlmPage } from "./app/pages/ilm-page/page";
import { RouterConfig } from "./app/router";
import { IlmDetailsPage } from "./app/pages/ilm-details-page/page";
import { NotificationProvider } from "./shared";
import { walletConfig } from "../wallet.config.ts";
import { NavigationBar } from "./app/components/navbar/NavigationBar.tsx";

const config = getDefaultConfig({
  appName: walletConfig.appName,
  projectId: walletConfig.walletConnectProjectId,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chains: walletConfig.chains as any,
  transports: walletConfig.transports,
});

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <NavigationBar />
              <Routes>
                <Route path={RouterConfig.Routes.ilm} element={<IlmPage />} />
                <Route
                  path={RouterConfig.Routes.ilmDetails}
                  element={<IlmDetailsPage />}
                />
              </Routes>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
