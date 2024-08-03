export const tenderlyEvmSnapshot = async (forkUrl: string) => {
  const API_KEY = Cypress.env("tenderly_access_key");

  const response = await fetch(forkUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Key": API_KEY,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "evm_snapshot",
      params: [],
      id: "1234",
    }),
  });

  const data = await response.json();
  return data.result; // Returns the UUID of the snapshot
};
