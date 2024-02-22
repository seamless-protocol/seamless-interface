import { WidgetConfig } from '@lifi/widget';
import { base, mainnet } from "wagmi/chains";

export const lifiConfig: WidgetConfig = {
  integrator: import.meta.env.VITE_LIFI_INTEGRATOR,
  variant: "drawer",
  fee: 0,
  toChain: base.id,
  fromChain: mainnet.id,
};
