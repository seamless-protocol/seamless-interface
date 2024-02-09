const baseUrl = "";

const etherScan = "https://basescan.org/tx";

export const RouterConfig = {
  Routes: {
    ilm: `${baseUrl}/`,
    lendingAndBorrowing: `https://app.seamlessprotocol.com`,
    ilmDetails: `${baseUrl}/ilm-details/:id`,
  },
  // This is used everywhere in app, for navigation and links to build dynamic routes
  Builder: {
    ilmDetails: (id: number) => `${baseUrl}/ilm-details/${id}`,
    baseScan: (txHash: string) => `${etherScan}/${txHash}`,
  },
};
