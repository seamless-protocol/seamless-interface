import "@rainbow-me/rainbowkit/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http } from "wagmi"; //, http, createConfig
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { injected, safe } from "wagmi/connectors";
import { base } from "wagmi/chains";
import { IlmPage } from "./app/pages/ilm-page/page";
import { RouterConfig } from "./app/router";
import { NavBar } from "./app/components/navbar/NavBar";
import { IlmDetailsPage } from "./app/pages/ilm-details-page/page";
import { NotificationProvider } from "./shared";

const config = getDefaultConfig({
  appName: "Seamless protocol",
  projectId: import.meta.env.VITE_BASE_WALLET_PROJECT_ID || "",
  chains: [base],
  transports: {
    [base.id]: http(import.meta.env.VITE_BASE_RPC_URL),
  },
});

// const config = createConfig({
//   chains: [base],
//   connectors: [injected(), safe()],
//   transports: {
//     [base.id]: http(import.meta.env.VITE_BASE_RPC_URL),
//   },
// });

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <NavBar />
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
