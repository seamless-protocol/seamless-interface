import { Address } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { LeverageManagerAbi } from "../../../../../../abis/LeverageManager";
import { fetchToken, formatFetchBigIntToViewBigInt, ViewBigInt } from "../../../../../shared";
import { config } from "../../../../config/rainbow.config";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { leverageManagerAddress } from "../../../../generated";
import { cCollateralRatioToLeverage } from "../collateral-ratios/leverage-ratios.fetch";
import { fetchLeverageTokenAssets } from "../leverage-token-assets/leverage-token-assets.fetch";

export const getLeverageTokenStateQueryOptions = (leverageToken: Address) => ({
  ...readContractQueryOptions(config, {
    address: leverageManagerAddress,
    abi: LeverageManagerAbi,
    functionName: "getLeverageTokenState",
    args: [leverageToken],
  }),
});

export interface LeverageTokenState {
  collateralInDebtAsset: ViewBigInt;
  debt: ViewBigInt;
  equity: ViewBigInt;
  currentLeverage: ViewBigInt;
}

export const fetchLeverageTokenState = async (leverageToken: Address) => {
  const [{ debtAsset }, leverageTokenState] = await Promise.all([
    fetchLeverageTokenAssets(leverageToken),
    getQueryClient().fetchQuery({
      ...getLeverageTokenStateQueryOptions(leverageToken),
    }),
  ]);

  const { decimals: debtAssetDecimals, symbol: debtAssetSymbol } = await fetchToken(debtAsset);

  return {
    collateralInDebtAsset: formatFetchBigIntToViewBigInt({
      bigIntValue: leverageTokenState.collateralInDebtAsset,
      decimals: debtAssetDecimals,
      symbol: debtAssetSymbol,
    }),
    debt: formatFetchBigIntToViewBigInt({
      bigIntValue: leverageTokenState.debt,
      decimals: debtAssetDecimals,
      symbol: debtAssetSymbol,
    }),
    equity: formatFetchBigIntToViewBigInt({
      bigIntValue: leverageTokenState.equity,
      decimals: debtAssetDecimals,
      symbol: debtAssetSymbol,
    }),
    currentLeverage: formatFetchBigIntToViewBigInt({
      bigIntValue: cCollateralRatioToLeverage(leverageTokenState.collateralRatio),
      decimals: 18,
      symbol: "x",
    }),
  };
};
