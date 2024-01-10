import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { injected, metaMask, safe } from "wagmi/connectors";

export const config = createConfig({
  chains: [base],
  connectors: [injected(), metaMask(), safe()],
  transports: {
    [base.id]: http(
      "https://rpc.tenderly.co/fork/546513f3-f768-4d02-9ce0-83a000e9b8c3"
    ),
  },
});
