export const tenderlyDeleteFork = async (id: string) => {
  const account = Cypress.env("tenderly_profile");
  const project = Cypress.env("tenderly_project");
  const API_KEY = Cypress.env("tenderly_access_key");

  const url = `https://api.tenderly.co/api/v1/account/${account}/project/${project}/testnet/container/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Key": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Error deleting fork: ${response.statusText}`);
  }

  return true;
};
