import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http, createConfig } from "wagmi";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { injected, metaMask, safe } from "wagmi/connectors";
import { base } from "wagmi/chains";
import { IlmPage } from "./app/pages/ilm-page/page";
import { RouterConfig } from "./app/router";
import { NavBar } from "./app/components/navbar/NavBar";
import { IlmDetailsPage } from "./app/pages/ilm-details-page/page";
import { NotificationProvider } from "./shared";

const config = createConfig({
  chains: [base],
  connectors: [injected(), metaMask(), safe()],
  transports: {
    [base.id]: http(import.meta.env.VITE_BASE_RPC_URL),
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <NavBar />
            <Routes>
              <Route path={RouterConfig.Routes.ilm} element={<IlmPage />} />
              <Route
                path={RouterConfig.Routes.ilmDetails}
                element={<IlmDetailsPage />}
              />
            </Routes>
          </QueryClientProvider>
        </WagmiProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
