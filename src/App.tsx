import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "../config/wagmi/config";
import { WagmiProvider } from "wagmi";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import InfoPanel from "./components/InfoPanel";

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ResponsiveAppBar />
        <InfoPanel />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
