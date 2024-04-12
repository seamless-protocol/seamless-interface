import { maxUint256 } from "viem";

export const IS_DEV_MODE = process.env.NODE_ENV === "development";

export const IS_STYLE_VERSION_2 = import.meta.env.VITE_STYLE_VERSION === "v2";

export const MAX_NUMBER = maxUint256;
