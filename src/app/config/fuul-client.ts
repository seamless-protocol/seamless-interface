import { Fuul } from "@fuul/sdk";

const apiKey = import.meta.env.VITE_FULL_API_KEY;

Fuul.init({ apiKey });

export const getFuulClient = () => Fuul;
