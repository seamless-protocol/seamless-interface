import { Address } from "viem";
import { seamlesscbBTCMorphoVault, seamlessETHMorphoVault, seamlessUSDCMorphoVault } from "@meta";

const baseUrl = "";

export const gauntletOptimizedTwitterUrl = "https://twitter.com/SeamlessFi/status/1769845618720326053";
const lendingAndBorrowingUrl = "https://legacy.seamlessprotocol.com";
const supplyEthLegacy = `${lendingAndBorrowingUrl}/reserve-overview/?underlyingAsset=0x4200000000000000000000000000000000000006&marketName=proto_base_v3`;
const stakingFarmsUrl = "https://farms.seamlessprotocol.com";
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
export const seamlessSurveyUrl = "https://form.typeform.com/to/WAJ8RIoL";
export const legacyPlatformDeprecationNoticeUrl =
  "https://discord.com/channels/1037820309400731769/1037836076875788419/1355232743541182566";
export const CertoraAuditReportLink = "https://www.certora.com/reports/seamless";

export const discourseBaseUrl = "https://seamlessprotocol.discourse.group";

export const disourseUrl = `${discourseBaseUrl}/t/gp-what-drives-seamless-core-beliefs-vision-future/584`;

export const tallyUrl = "https://www.tally.xyz/gov/seamless-protocol";
export const snapShotUrl = "https://snapshot.box/#/s:seamlessprotocol.eth";
export const govFaqUrl = "https://docs.seamlessprotocol.com/governance/governance-overview";
export const delegateUrl = "https://seamlessprotocol.discourse.group/t/seamless-community-representatives/42";

export const legacyGovUrl = "https://legacy.seamlessprotocol.com/governance";
export const gitbookStakingUrl = "https://docs.seamlessprotocol.com/overview/seam-staking";

export const ilmv1DuneUrl = "https://dune.com/seamlessprotocol/ilm-viewer";

const baseScan = "https://basescan.org";

export const RouterConfig = {
  Routes: {
    markets: `${baseUrl}/`,
    landingPage: `${baseUrl}/`,
    lendingAndBorrowing: `${lendingAndBorrowingUrl}/`,
    stakingFarms: `${stakingFarmsUrl}/`,
    stakingTab: `/?tab=Staking`,
    dashboardTab: `/?tab=Dashboard`,
    governance: `/governance`,
    pointLeaderboard: `/point-leaderboard`,
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
    leverageToken: `${baseUrl}/leverage-token-details/:address`,
    morphoVaultDetailsv3: `${baseUrl}/vault-details/:address`,
    morphoVaultsTab: `${baseUrl}/?tab=Vaults`,
  },
  // This is used everywhere in app, for navigation and links to build dynamic routes
  Builder: {
    ilmDetailsv2: (id: number) => `${baseUrl}/ilm-detailsv2/${id}`,
    ilmDetails: (address: Address) => `${baseUrl}/ilm-details/${address}`,
    leverageTokenDetails: (address: Address) => `${baseUrl}/leverage-token-details/${address}`,
    morphoVaultDetails: (address: Address) => `${baseUrl}/vault-details/${address}`,
    assetDetails: (address: Address) =>
      `${lendingAndBorrowingUrl}/reserve-overview/?underlyingAsset=${address.toLowerCase()}&marketName=proto_base_v3`,
    baseScanTx: (txHash: string) => `${baseScan}/tx/${txHash}`,
    baseScanAddress: (address: string) => `${baseScan}/address/${address}`,
    vaults: (address: string) => `${vaultsFyiUrl}/${address}`,
  },
};

const _VaultSeamlessprotocolDiscourseGroupUrl: { [vaultName: string]: string } = {
  [seamlessUSDCMorphoVault]: `${discourseBaseUrl}/t/introducing-seamless-usdc-vaults/770`,
  [seamlesscbBTCMorphoVault]: `${discourseBaseUrl}/t/introducing-the-seamless-cbbtc-vault/819/`,
  [seamlessETHMorphoVault]: `${discourseBaseUrl}/t/introducing-seamless-weth-vault/864`,
};

export const getVaultSeamlessprotocolDiscourseGroupUrl = (vaultAddress?: string) => {
  return vaultAddress ? _VaultSeamlessprotocolDiscourseGroupUrl[vaultAddress] : "";
};
