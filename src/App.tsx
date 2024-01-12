import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http, createConfig } from "wagmi";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { injected, metaMask, safe } from "wagmi/connectors";
import { base } from "wagmi/chains";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import MarketPage from "./components/pages/MarketPage";
import DetailsPage from "./components/pages/DetailsPage";

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
            <Route path="/" element={<MarketPage />} />
            <Route path="/details" element={<DetailsPage />} />
          </Routes>
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>
  );
}

export default App;
