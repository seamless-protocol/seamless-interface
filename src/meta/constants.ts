import brettLogo from "@assets/tokens/brett.svg";
import esSeamLogo from "@assets/tokens/esSeam.svg";
import ogPointsLogo from "@assets/tokens/og-points.svg";
import seamLogo from "@assets/tokens/seam.svg";
import usdcLogo from "@assets/tokens/usdc.svg";
import type { DecimalsOptions } from "@shared";
import { Address, parseEther } from "viem";
import { uniswapV2Router02Address } from "../app/generated";

export const USD_VALUE_DECIMALS = 8;
export const PERCENTAGE_VALUE_DECIMALS = 2;
export const STRATEGY_MULTIPLE_DECIMALS = 18;
export const STRATEGY_MULTIPLE_FORMAT_DECIMALS = 1;

export const walletBalanceDecimalsOptions: Partial<DecimalsOptions> = {
  singleDigitNumberDecimals: 6,
  doubleDigitNumberDecimals: 4,
};

export const walletBalanceDecimalsOptionsTemp: Partial<DecimalsOptions> = {
  singleDigitNumberDecimals: 3,
};

export const SECONDS_PER_YEAR = 60 * 60 * 24 * 365;
export const COMPOUNDING_PERIODS_APY = 1;

export const MOCK_PRICE_ORACLE = "0x602823807C919A92B63cF5C126387c4759976072";

export const ETH_ADDRESS: Address = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const WETH_ADDRESS: Address = "0x4200000000000000000000000000000000000006";
export const WEETH_ADDRESS: Address = "0x04C0599Ae5A44757c0af6F9eC3b93da8976c150A";
export const CBETH_ADDRESS: Address = "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22";
export const WSTETH_ADDRESS: Address = "0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452";
export const USDBC_ADDRESS: Address = "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA";
export const DAI_ADDRESS: Address = "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb";
export const USDC_ADDRESS: Address = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
export const rwstETH_ADDRESS: Address = "0xc9ae3B5673341859D3aC55941D27C8Be4698C9e4";
export const rWETH_ADDRESS: Address = "0x3e8707557d4ad25d6042f590bcf8a06071da2c5f";
export const DEGEN_ADDRESS: Address = "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed";
export const SEAM_ADDRESS: Address = "0x1C7a460413dD4e964f96D8dFC56E7223cE88CD85";
export const STAKED_SEAM_ADDRESS: Address = "0x73f0849756f6A79C1d536b7abAB1E6955f7172A4";

export const AERO_ADDRESS: Address = "0x940181a94A35A4569E4529A3CDfB74e38FD98631";
export const BRETT_ADDRESS: Address = "0x532f27101965dd16442E59d40670FaF5eBB142E4";
export const ESSEAM_ADDRESS: Address = "0x998e44232BEF4F8B033e5A5175BDC97F2B10d5e5";
export const OG_POINTS_ADDRESS: Address = "0x5607718c64334eb5174CB2226af891a6ED82c7C6";
export const cbBTC_ADDRESS: Address = "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf";

export const OG_POINTS_MOCK_PRICE: bigint = 0n;

// Lending & Borrowing
export const sWETH_ADDRESS: Address = "0x48bf8fCd44e2977c8a9A744658431A8e6C0d866c";
export const swstETH_ADDRESS: Address = "0xfA48A40DAD139e9B1aF8dc82F37Da58cC3cA2867";
export const sUSDbC_ADDRESS: Address = "0x13A13869B814Be8F13B86e9875aB51bda882E391";
export const scbETH_ADDRESS: Address = "0x2c159A183d9056E29649Ce7E56E59cA833D32624";
export const sUSDC_ADDRESS: Address = "0x53E240C0F985175dA046A62F26D490d1E259036e";
export const sDAI_ADDRESS: Address = "0x37eF72fAC21904EDd7e69f7c7AC98172849efF8e";
export const srwstETH_ADDRESS: Address = "0xb01C5c4eB40d2F2b64Daa3170F89849d00eA6B44";
export const srWETH_ADDRESS: Address = "0xC52D72B89931fDA7C7B7B13cc3359EF6207d4638";
export const sDEGEN_ADDRESS: Address = "0x39c0926455682A2aFB5680045f309848C350de34";
export const sSEAM_ADDRESS: Address = "0x67368dF7734aee0bc65A845AC6d73974626b7A34";
export const rUSDC_ADDRESS: Address = "0x9660Af3B1955648A72F5C958E80449032d645755";

export const variableDebtSeamcbETH_ADDRESS: Address = "0x72Dbdbe3423cdA5e92A3cC8ba9BFD41F67EE9168";
export const variableDebtSeamDAI_ADDRESS: Address = "0x2733e1DA7d35c5ea3ed246ed6b613DC3dA97Ce2E";
export const variableDebtSeamUSDC_ADDRESS: Address = "0x27Ce7E89312708FB54121ce7E44b13FBBB4C7661";
export const variableDebtSeamUSDbC_ADDRESS: Address = "0x326441fA5016d946e6E82e807875fDfdc3041B3B";
export const variableDebtSeamWETH_ADDRESS: Address = "0x4cebC6688faa595537444068996ad9A207A19f13";
export const variableDebtSeamwstETH_ADDRESS: Address = "0x51fB9021d61c464674b419C0e3082B5b9223Fc17";
export const variableDebtSeamrwstETH_ADDRESS = "0xf2306020Be299477fdd387BeFd47C6140B03e195";
export const variableDebtSeamDEGEN_ADDRESS = "0xfb4acbf586010670b9454d3fd4e7a31e1c8e0d98";
export const variableDebtSeamSEAM_ADDRESS = "0x269eff46ba6ab639f5dbd745191bd987ba03de3b";
export const variableDebtSeamrWETH_ADDRESS = "0x2782293d989639faba72251ac1972aba71d02506";
export const ethShort_ADDRESS_1_5_x: Address = "0x68DFad1A72c63897FEC5fB9De9FDb5670280291e";
export const wstETHBooster_3x: Address = "0x258730e23cF2f25887Cb962d32Bd10b878ea8a4e"; // 0x2962673cC60eE877768A38fa6d7FEe7468b3F09b
// export const wstETHBooster4_5x_ADDRESS: Address = "0x2a351F41Bc0080c3Ae52C1708Ff7442b024Ab426";
export const ethLong_1_5x: Address = "0x2FB1bEa0a63F77eFa77619B903B2830b52eE78f4";
export const ethLong_3x: Address = "0x5Ed6167232b937B0A5C84b49031139F405C09c8A";
export const ethLong_4_5x: Address = "0x8199bE1c92cf87Ac52705dab9F2B65d7fABbceD6";
export const cbBTCLong_1_5x: Address = "0x5CE6A61E60AD45dBD80565349A8B902DC461A1FE";
export const cbBTCLong_3x: Address = "0xdeCF8c9D927275e8b25721d3EF16d14AC8eb8766";

// leverage tokens
export const weeth_weth_17x_LT: Address = "0xA2fceEAe99d2cAeEe978DA27bE2d95b0381dBB8c";

// MORPHO VAULTS
export const seamlessUSDCMorphoVault: Address = "0x616a4E1db48e22028f6bbf20444Cd3b8e3273738";
export const seamlesscbBTCMorphoVault: Address = "0x5a47C803488FE2BB0A0EAaf346b420e4dF22F3C7";
export const seamlessETHMorphoVault: Address = "0x27D8c7273fd3fcC6956a0B370cE5Fd4A7fc65c18";

// STAKING MODULE
export const safetyModuleRewardController: Address = "0x2C6dC2CE7747E726A590082ADB3d7d08F52ADB93";

// FE strategies
export const wstETHBooster_ADDRESS_STRATEGY_ID = `${WSTETH_ADDRESS}-${WETH_ADDRESS}`;
export const multiplyETH_ADDRESS_STRATEGY_ID = `${WETH_ADDRESS}-${USDC_ADDRESS}`;
export const shortETH_ADDRESS_STRATEGY_ID = `${USDC_ADDRESS}-${WETH_ADDRESS}`;
export const longBTC_ADDRESS_STRATEGY_ID = `${cbBTC_ADDRESS}-${USDC_ADDRESS}`;

export const ONE_USD = BigInt(10 ** 8);
export const ONE_ETHER = BigInt(10 ** 18);

export const MAX_LIQUIDATION_THRESHOLD = 10000n;
export const INFINITE_HEALTH_FACTOR_BORDER = parseEther("1000000000000000");

// OP Bedrock based chains produce a block every 2 seconds
export const APY_BLOCK_FRAME = ((60n * 60n * 24n) / 2n) * 30n; // 30 days

export const AAVE_ADDRESS_PROVIDER = "0x0E02EB705be325407707662C6f6d3466E939f3a0";

export const FUUL_MANAGER_ADDRESS = "0xC38E3A10B5818601b29c83F195E8b5854AAE45aF";

export const ETHERFI_L2_MODE_SYNC_POOL_ADDRESS = "0xc38e046dFDAdf15f7F56853674242888301208a5";

// todo refactor this by address or fetch this?
// this is deprecated, please use addressIconMap from config v3.
export const assetLogos: Map<string, string> = new Map([
  ["SEAM", seamLogo],
  ["esSEAM", esSeamLogo],
  ["OG Points", ogPointsLogo],
  ["USDC", usdcLogo],
  ["BRETT", brettLogo],
]);

export const lendingAssetToHide: String[] = [
  rwstETH_ADDRESS.toLowerCase(),
  rWETH_ADDRESS.toLowerCase(),
  rUSDC_ADDRESS.toLowerCase(),
];

export const NOT_CONNECTED_WALLET_MESSAGE = "Please connect your wallet.";

// Error constants
export const OVERFLOW_UNDERFLOW_REASON_MESSAGE = "Arithmetic operation resulted in underflow or overflow.";

export const SWAP_ADAPTER_EXCHANGE_ADDRESSES = {
  aerodromeRouter: "0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43",
  aerodromePoolFactory: "0x5e7BB104d84c7CB9B682AaC2F3d509f5F406809A",
  aerodromeSlipstreamRouter: "0xBE6D8f0d05cC4be24d5167a3eF062215bE6D18a5",
  uniswapSwapRouter02: "0x2626664c2603336E57B271c5C0b26F421741e481",
  uniswapV2Router02: uniswapV2Router02Address,
};

export const UNISWAP_FEES = [100, 300, 500, 1000];
export const AERODROME_FEES = [100, 300, 500, 1000];
export const AUCTION_PRICE_MULTIPLIER_DECIMALS = 18;

export const COLLATERAL_RATIO_DECIMALS = 18;

export const MAX_HISTORICAL_DATA_POINTS = 15000;
