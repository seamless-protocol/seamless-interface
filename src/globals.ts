import { maxUint256 } from "viem";

/* ----------- */
/*    Other    */
/* ------------ */
export const IS_DEV_MODE = process.env.NODE_ENV === "development";
export const IS_STYLE_VERSION_2 = import.meta.env.VITE_STYLE_VERSION === "v2";
export const MAX_NUMBER = maxUint256;

/* --------------- */
/*   TESTING RPC   */
/* --------------- */
export const LOCALSTORAGE_TESTNET_URL_KEY = "LOCALSTORAGE_TESTNET_URL_KEY";
export const LOCALSTORAGE_IS_TEST_MODE_KEY = "LOCALSTORAGE_IS_TEST_MODE_KEY";

// this value will be generated and set in cypress
export const IS_TEST_MODE = localStorage.getItem(LOCALSTORAGE_IS_TEST_MODE_KEY) === "true";
const TESTING_RPC = localStorage.getItem(LOCALSTORAGE_TESTNET_URL_KEY) || (undefined as any);
const { forkUrl } = TESTING_RPC ? JSON.parse(TESTING_RPC).forkUrl : {};
export const TENDERLY_RPC_URL: string =
  IS_TEST_MODE && IS_DEV_MODE
    ? forkUrl || import.meta.env.VITE_TENDERLY_RPC_URL
    : import.meta.env.VITE_TENDERLY_RPC_URL;

/* --------------- */
/*   OTHER RPCs    */
/* --------------- */
export const VITE_EXTENSIVE_OPERATIONS_RPC_URL =
  IS_TEST_MODE && IS_DEV_MODE ? TENDERLY_RPC_URL : import.meta.env.VITE_EXTENSIVE_OPERATIONS_RPC_URL;
