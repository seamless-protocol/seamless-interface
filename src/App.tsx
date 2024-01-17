import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http, createConfig } from "wagmi";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { injected, metaMask, safe } from "wagmi/connectors";
import { base } from "wagmi/chains";
import ResponsiveAppBar from "./components/navbar/ResponsiveAppBar";
import DetailsPage from "./components/details-page/DetailsPage";
import IlmPage from "./components/ilm-page/IlmPage";

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
            <Route path="/" element={<IlmPage />} />
            <Route path="/details" element={<DetailsPage />} />
          </Routes>
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>
  );
}

export default App;
