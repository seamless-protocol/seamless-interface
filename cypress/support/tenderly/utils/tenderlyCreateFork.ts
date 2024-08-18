export const tenderlyCreateFork = async (chainId = 8453) => {
  const account = Cypress.env("seamless");
  const project = Cypress.env("dev");
  const API_KEY = Cypress.env("tenderly_access_key");

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
