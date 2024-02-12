import { baseAssets } from "../state/lending-borrowing/config/BaseAssetsConfig";

const baseUrl = "";
const lendingAndBorrowingUrl = "https://app.seamlessprotocol.com";

const baseScan = "https://basescan.org/tx";

export const RouterConfig = {
  Routes: {
    ilm: `${baseUrl}/`,
    lendingAndBorrowing: `${lendingAndBorrowingUrl}/`,
    ilmDetails: `${baseUrl}/ilm-details/:id`,
  },
  // This is used everywhere in app, for navigation and links to build dynamic routes
  Builder: {
    ilmDetails: (id: number) => `${baseUrl}/ilm-details/${id}`,
    assetDetails: (id: number) =>
      `${lendingAndBorrowingUrl}/reserve-overview/?underlyingAsset=${baseAssets[id].address.toLowerCase()}&marketName=proto_base_v3`,
    baseScan: (txHash: string) => `${baseScan}/${txHash}`,
  },
};
