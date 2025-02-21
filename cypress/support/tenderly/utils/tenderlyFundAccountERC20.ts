import { toHex } from "viem";

export const tenderlyFundAccountERC20 = async (
  forkUrl: string,
  tokenAddress: string,
  account: string,
  amount: bigint
) => {
  const API_KEY = Cypress.env("tenderly_access_key");

  // Set the ERC-20 balance using the tenderly_setErc20Balance endpoint
  const response = await fetch(forkUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Key": API_KEY,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "tenderly_setErc20Balance",
      params: [tokenAddress, account, toHex(amount)],
      id: "1234",
    }),
  });

  if (!response.ok) {
    throw new Error(`Error funding account with ERC-20 token: ${response.statusText}`);
  }

  const data = await response.json();

  // Construct the call data for ERC-20's balanceOf(address)
  // The function signature for balanceOf is 0x70a08231
  // Append the account address (without the '0x' prefix, left-padded to 64 characters)
  const accountData = account.slice(2).padStart(64, "0");
  const callData = `0x70a08231${accountData}`;

  // Retrieve the current token balance via eth_call
  const balanceResponse = await fetch(forkUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Key": API_KEY,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_call",
      params: [
        {
          to: tokenAddress,
          data: callData,
        },
        "latest",
      ],
      id: "1235",
    }),
  });

  if (!balanceResponse.ok) {
    console.error(`Error retrieving ERC-20 balance: ${balanceResponse.statusText}`);
    throw new Error(`Error retrieving ERC-20 balance: ${balanceResponse.statusText}`);
  }

  const balanceData = await balanceResponse.json();
  // Convert the hex result to a bigint
  const currentBalance = BigInt(balanceData.result);

  // Compare the expected amount with the retrieved balance
  if (currentBalance !== amount) {
    console.error(`ERC-20 Balance mismatch: expected ${amount} token units, but got ${currentBalance} token units`);
    throw new Error("ERC-20 balance verification failed: token balance does not match the expected amount.");
  }

  // eslint-disable-next-line no-console
  console.log(`ERC-20 Balance: ${currentBalance} token units`);

  return data;
};
