import { Address } from "viem";
import { seamlesscbBTCMorphoVault, seamlessUSDCMorphoVault } from "@meta";

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
export const gitBookUrl = "https://docs.seamlessprotocol.com/";
export const ilmMediumUrl =
  "https://seamlessprotocol.com/blog-posts/ilms-simplifying-and-enhancing-your-defi-strategies?utm_source=SeamlessAppRedirectILMBlog";
const vaultsFyiUrl = "https://www.vaults.fyi/vaults/base";
export const seamlessSurveyUrl = "https://form.typeform.com/to/r2zubM3o";
export const CertoraAuditReportLink = "https://www.certora.com/reports/seamless";
export const disourseUrl =
  "https://seamlessprotocol.discourse.group/t/gp-what-drives-seamless-core-beliefs-vision-future/584";

const baseScan = "https://basescan.org";

export const RouterConfig = {
  Routes: {
    markets: `${baseUrl}/`,
    landingPage: `${baseUrl}/`,
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
    ilmDetails: `${baseUrl}/ilm-detailsv2/:id`,
    ilmDetailsv3: `${baseUrl}/ilm-details/:address`,
    morphoVaultDetailsv3: `${baseUrl}/vault-details/:address`,
    morphoVaultsTab: `${baseUrl}/?tab=Vaults`,
  },
  // This is used everywhere in app, for navigation and links to build dynamic routes
  Builder: {
    ilmDetailsv2: (id: number) => `${baseUrl}/ilm-detailsv2/${id}`,
    ilmDetails: (address: Address) => `${baseUrl}/ilm-details/${address}`,
    morphoVaultDetails: (address: Address) => `${baseUrl}/vault-details/${address}`,
    assetDetails: (address: Address) =>
      `${lendingAndBorrowingUrl}/reserve-overview/?underlyingAsset=${address.toLowerCase()}&marketName=proto_base_v3`,
    baseScanTx: (txHash: string) => `${baseScan}/tx/${txHash}`,
    baseScanAddress: (address: string) => `${baseScan}/address/${address}`,
    vaults: (address: string) => `${vaultsFyiUrl}/${address}`,
  },
};

const _VaultSeamlessprotocolDiscourseGroupUrl: { [vaultName: string]: string } = {
  [seamlessUSDCMorphoVault]: "https://seamlessprotocol.discourse.group/t/introducing-seamless-usdc-vaults/770",
  [seamlesscbBTCMorphoVault]: "https://seamlessprotocol.discourse.group/t/introducing-the-seamless-cbbtc-vault/819/",
};

export const getVaultSeamlessprotocolDiscourseGroupUrl = (vaultAddress?: string) => {
  return vaultAddress ? _VaultSeamlessprotocolDiscourseGroupUrl[vaultAddress] : "";
};
