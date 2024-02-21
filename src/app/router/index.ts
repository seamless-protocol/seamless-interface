import { baseAssets } from "../state/lending-borrowing/config/BaseAssetsConfig";

const baseUrl = "";
const lendingAndBorrowingUrl = "https://app.seamlessprotocol.com";
const stakingFarmsUrl = "https://farms.seamlessprotocol.com";
const governanceUrl = "https://app.seamlessprotocol.com/governance";
const claimAirdropUrl = "https://claim.seamlessprotocol.com/";
const faqUrl = "https://docs.seamlessprotocol.com/overview/faq";
const developersUrl = "https://github.com/seamless-protocol/interface";

const baseScan = "https://basescan.org/tx";
const transactionHistory = "https://app.seamlessprotocol.com/history/";

export const RouterConfig = {
  Routes: {
    markets: `${baseUrl}/`,
    lendingAndBorrowing: `${lendingAndBorrowingUrl}/`,
    stakingFarms: `${stakingFarmsUrl}/`,
    governance: `${governanceUrl}/`,
    claimAirdrop: `${claimAirdropUrl}`,
    faq: `${faqUrl}`,
    developers: `${developersUrl}`,
    ilmDetails: `${baseUrl}/ilm-details/:id`,
    transactionHistory: `${transactionHistory}`,
  },
  // This is used everywhere in app, for navigation and links to build dynamic routes
  Builder: {
    ilmDetails: (id: number) => `${baseUrl}/ilm-details/${id}`,
    assetDetails: (id: number) =>
      `${lendingAndBorrowingUrl}/reserve-overview/?underlyingAsset=${baseAssets[id].address.toLowerCase()}&marketName=proto_base_v3`,
    baseScan: (txHash: string) => `${baseScan}/${txHash}`,
  },
};
