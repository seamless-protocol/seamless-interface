import { toHex } from "viem";
import { targetAccount } from "../../constants";

export const tenderlyFundAccount = async (forkUrl: string, account = targetAccount, amount = BigInt(5 * 1e18)) => {
  const API_KEY = Cypress.env("tenderly_access_key");

  const setResponse = await fetch(forkUrl, {
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

  if (!setResponse.ok) {
    console.error(`Error funding account with native token: ${setResponse.statusText}`);
    throw new Error(`Error funding account with native token: ${setResponse.statusText}`);
  }

  const setData = await setResponse.json();

  // Retrieve the current balance using the eth_getBalance endpoint
  const balanceResponse = await fetch(forkUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Key": API_KEY,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_getBalance",
      params: [account, "latest"],
      id: "1235",
    }),
  });

  if (!balanceResponse.ok) {
    console.error(`Error retrieving account balance: ${balanceResponse.statusText}`);
    throw new Error(`Error retrieving account balance: ${balanceResponse.statusText}`);
  }

  const balanceData = await balanceResponse.json();
  const currentBalance = BigInt(balanceData.result);

  // Check if the balance matches the desired amount
  if (currentBalance !== amount) {
    console.error(`Balance mismatch: expected ${amount} wei, but got ${currentBalance} wei`);
    throw new Error("Balance verification failed: account balance does not match the expected amount.");
  }

  // eslint-disable-next-line no-console
  console.log(`Account ${account} funded with ${amount} wei`);

  return setData;
};
