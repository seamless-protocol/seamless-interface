export const fetchLast20Testnets = async () => {
    const account = Cypress.env("tenderly_profile");
    const project = Cypress.env("tenderly_project");
    const API_KEY = Cypress.env("tenderly_access_key");
  
    const url = `https://api.tenderly.co/api/v1/account/${account}/project/${project}/testnet/container?page=1&pageSize=20`
  
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Key": API_KEY,
      },
    });
  
    if (!response.ok) {
      throw new Error(`Error fetching testnets: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data.containers;
  };
  
  
  export const findTestnetIdByDisplayName = async (displayName: string) => {
    const testnets = await fetchLast20Testnets();
    const testnet = testnets.find((tn: { displayName: string; }) => tn.displayName === displayName);
    return testnet ? testnet.id : null;
  };
  