import Moralis from "moralis";

import { Address } from "viem";

await Moralis.start({
  apiKey: import.meta.env.VITE_MORALIS_API_KEY,
});

export const fetchTokenLogoFromMoralis = async (tokenAddress: Address) => {
  try {
    const response = await Moralis.EvmApi.token.getTokenMetadata({
      chain: "0x2105",
      addresses: [tokenAddress],
    });

    return response.raw[0].logo;
  } catch (e) {
    console.error(e);
  }
  return undefined;
};
