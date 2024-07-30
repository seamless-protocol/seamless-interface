import { base } from "viem/chains";

const account = "seamless";
const project = "dev";
const API_KEY = "RDHizgXiBFXLHy2ZhVMSZeeo26Wufpi-";

export const createFork = async (chainId = 8453) => {
  try {
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
          block_number: "0x12c50f0",
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

    return data;
  } catch (e) {}

  // if (!response.ok) {
  //   throw new Error(`Error creating fork: ${response.statusText}`);
  // }

  return undefined;
};

//todo remove this function when create gets fixed
export const getFork = async () => {
  const response = await fetch(
    `https://api.tenderly.co/api/v1/account/${account}/project/${project}/testnet/container?page=1&pageSize=10`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Key": API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching forks: ${response.statusText}`);
  }

  const data = await response.json();
  console.log({ data });

  return data.containers?.[0]?.id;
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

export const fundAccount = async (forkUrl: string, account: string, amount: string) => {
  const response = await fetch(forkUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "tenderly_setBalance",
      params: [[account], amount],
      id: "1",
    }),
  });

  if (!response.ok) {
    throw new Error(`Error funding account with native token: ${response.statusText}`);
  }

  const data = await response.json();
  console.log({ fundAccount: data });
  return data;
};

export const fundAccountERC20 = async (forkUrl: string, tokenAddress: string, account: string, amount: string) => {
  const response = await fetch(forkUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "tenderly_setErc20Balance",
      params: [tokenAddress, [account], amount],
      id: "2",
    }),
  });

  if (!response.ok) {
    throw new Error(`Error funding account with ERC-20 token: ${response.statusText}`);
  }

  const data = await response.json();
  console.log({ erc20f: data });
  return data;
};
