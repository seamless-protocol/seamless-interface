import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { chains, wagmiConfig } from "../config/wagmi/config";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import InfoPanel from "./components/InfoPanel";

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({
          accentColor: "#474D4C",
          borderRadius: "none",
          fontStack: "system",
        })}
      >
        <QueryClientProvider client={queryClient}>
          <ResponsiveAppBar />
          <InfoPanel />
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
