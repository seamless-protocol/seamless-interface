import { Fuul } from "@fuul/sdk";

const apiKey = import.meta.env.VITE_FUUL_API_KEY;

Fuul.init({ apiKey });

export const getFuulClient = () => Fuul;
