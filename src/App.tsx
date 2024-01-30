import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http, createConfig } from "wagmi";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { injected, metaMask, safe } from "wagmi/connectors";
import { base } from "wagmi/chains";
import ResponsiveAppBar from "./app/components/navbar/ResponsiveAppBar";
import DetailsPage from "./app/pages/details-page/page";
import { IlmPage } from "./app/pages/ilm-page/page";
import { RouterConfig } from "./app/router";
import { IlmDetailsPage } from "./app/pages/ilm-details-page/page";

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
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ResponsiveAppBar />
          <Routes>
            <Route path={RouterConfig.Routes.ilm} element={<IlmPage />} />
            <Route
              path={RouterConfig.Routes.ilmDetails}
              element={<IlmDetailsPage />}
            />
            <Route path="/details" element={<DetailsPage />} />
          </Routes>
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>
  );
}

export default App;
