import { baseAssets } from "../state/lending-borrowing/config/BaseAssetsConfig";

const baseUrl = "";

export const gauntletOptimizedTwitterUrl = "https://twitter.com/SeamlessFi/status/1769845618720326053";
const lendingAndBorrowingUrl = "https://legacy.seamlessprotocol.com";
const supplyEthLegacy = `${lendingAndBorrowingUrl}/reserve-overview/?underlyingAsset=0x4200000000000000000000000000000000000006&marketName=proto_base_v3`;
const stakingFarmsUrl = "https://farms.seamlessprotocol.com";
const governanceUrl = "https://legacy.seamlessprotocol.com/governance";
const claimAirdropUrl = "https://claim.seamlessprotocol.com/";
const faqUrl = "https://docs.seamlessprotocol.com/overview/faq";
const developersUrl = "https://github.com/seamless-protocol";
const uniswapUrl = "https://app.uniswap.org/swap";
const chaosRiskDashboardUrl = "https://community.chaoslabs.xyz/seamless/risk/overview";
const gauntletRiskDashboardUrl = "https://risk.gauntlet.xyz/protocols/seamless/markets/base";

const baseScan = "https://basescan.org";

export const RouterConfig = {
  Routes: {
    markets: `${baseUrl}/`,
    lendingAndBorrowing: `${lendingAndBorrowingUrl}/`,
    stakingFarms: `${stakingFarmsUrl}/`,
    governance: `${governanceUrl}/`,
    chaosRiskDashboard: chaosRiskDashboardUrl,
    gauntletRiskDashboard: gauntletRiskDashboardUrl,
    claimAirdrop: `${claimAirdropUrl}`,
    supplyEthLegacy: `${supplyEthLegacy}`,
    wrapEth: `${uniswapUrl}?chain=base&inputCurrency=ETH&outputCurrency=0x4200000000000000000000000000000000000006`,
    unwrapEth: `${uniswapUrl}?chain=base&inputCurrency=0x4200000000000000000000000000000000000006&outputCurrency=ETH`,
    faq: `${faqUrl}`,
    developers: `${developersUrl}`,
    ilmDetails: `${baseUrl}/ilm-details/:id`,
  },
  // This is used everywhere in app, for navigation and links to build dynamic routes
  Builder: {
    ilmDetails: (id: number) => `${baseUrl}/ilm-details/${id}`,
    assetDetails: (id: number) =>
      `${lendingAndBorrowingUrl}/reserve-overview/?underlyingAsset=${baseAssets[id].address.toLowerCase()}&marketName=proto_base_v3`,
    baseScanTx: (txHash: string) => `${baseScan}/tx/${txHash}`,
    baseScanAddress: (address: string) => `${baseScan}/address/${address}`,
  },
};
