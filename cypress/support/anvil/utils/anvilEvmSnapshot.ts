import { anvilForkUrl } from "../constants";

export const anvilEvmSnapshot = async () => {
  const response = await fetch(anvilForkUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "evm_snapshot",
      params: [],
      id: 1,
    }),
  });

  const data = await response.json();
  return data.result;
};
