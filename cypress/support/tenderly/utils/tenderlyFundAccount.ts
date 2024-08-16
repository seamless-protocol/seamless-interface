import { toHex } from "viem";
import { targetAccount } from "../../constants";

export const tenderlyFundAccount = async (forkUrl: string, account = targetAccount, amount = BigInt(5 * 1e18)) => {
  const API_KEY = Cypress.env("tenderly_access_key");

  const response = await fetch(forkUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Key": API_KEY,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "tenderly_setBalance",
      params: [[account], toHex(amount)],
      id: "1234",
    }),
  });

  if (!response.ok) {
    throw new Error(`Error funding account with native token: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
