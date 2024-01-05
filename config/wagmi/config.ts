import { createConfig, http } from "wagmi";
import { injected } from "@wagmi/connectors";
import { base } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [injected()],
  transports: {
    [base.id]: http(),
  },
});
