import { targetAccount } from "../../constants";

const account = "seamless";
const project = "dev";
const API_KEY = "RDHizgXiBFXLHy2ZhVMSZeeo26Wufpi-";

export const createFork = async (chainId = 8453) => {
  const response = await fetch(`https://api.tenderly.co/api/v1/account/${account}/project/${project}/vnets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Key": API_KEY,
    },
    body: JSON.stringify({
      slug: "cypress-testnet",
      display_name: "Cypress TestNet",
      fork_config: {
        network_id: chainId,
        block_number: "latest",
      },
      virtual_network_config: {
        chain_config: {
          chain_id: chainId,
        },
      },
      sync_state_config: {
        enabled: false,
      },
      explorer_page_config: {
        enabled: false,
        verification_visibility: "bytecode",
      },
    }),
  });
  const data = await response?.json();

  if (!response.ok) {
    throw new Error(`Error creating fork: ${response.statusText}`);
  }

  return data.rpcs[0].url;
};

export const deleteFork = async (forkId: string) => {
  const response = await fetch(`https://api.tenderly.co/api/v1/account/${account}/project/${project}/fork/${forkId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Key": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Error deleting fork: ${response.statusText}`);
  }
};

export const fundAccount = async (forkUrl: string, account = targetAccount, amount = BigInt(5 * 1e18)) => {
  let amountHex = amount.toString(16);
  amountHex = amountHex.replace(/^0+/, "");
  const formattedAmount = `0x${amountHex}`;
  console.log({ formattedAmount });

  const response = await fetch(forkUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Key": API_KEY,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "tenderly_setBalance",
      params: [[account], formattedAmount],
      id: "1234",
    }),
  });

  if (!response.ok) {
    throw new Error(`Error funding account with native token: ${response.statusText}`);
  }

  const data = await response.json();
  console.log({ fundAccount: data });
  return data;
};

export const fundAccountERC20 = async (forkUrl: string, tokenAddress: string, account: string, amount: bigint) => {
  let amountHex = amount.toString(16);
  amountHex = amountHex.replace(/^0+/, "");
  const formattedAmount = `0x${amountHex}`;
  console.log({ formattedAmount });

  const response = await fetch(forkUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Key": API_KEY,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "tenderly_setErc20Balance",
      params: [tokenAddress, account, formattedAmount],
      id: "1234",
    }),
  });

  if (!response.ok) {
    throw new Error(`Error funding account with ERC-20 token: ${response.statusText}`);
  }

  const data = await response.json();
  console.log({ erc20f: data });
  return data;
};
