import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "../config/wagmi/config";
import { WagmiProvider } from "wagmi";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import MarketPage from "./components/pages/MarketPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailsPage from "./components/pages/DetailsPage";

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
