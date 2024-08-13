import { maxUint256 } from "viem";

export const IS_DEV_MODE = process.env.NODE_ENV === "development";
export const IS_SIMULATION_DISABLED = (import.meta.env.VITE_IS_SIMULATION_DISABLED === "true") as boolean;
console.log({ IS_SIMULATION_DISABLED });

export const IS_STYLE_VERSION_2 = import.meta.env.VITE_STYLE_VERSION === "v2";

export const MAX_NUMBER = maxUint256;
