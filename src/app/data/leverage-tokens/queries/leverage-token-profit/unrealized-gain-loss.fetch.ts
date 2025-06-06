import { Address } from "viem";
import { useQuery } from "@tanstack/react-query";

import { fetchLeverageTokenAssets } from "../leverage-token-assets/leverage-token-assets.fetch";
import { cValueInUsd } from "../../../../statev3/common/math/cValueInUsd";
import {
  fetchToken,
  formatFetchBigIntToViewBigInt,
  formatFetchNumberToViewNumber,
  ViewBigInt,
  ViewNumber,
} from "../../../../../shared";
import { fetchUserLeverageTokenProfit } from "./user-leverage-token-profit.fetch";
import { fetchUserEquity } from "../user-equity/user-equity.fetch";
import { useAccount } from "wagmi";
import { fetchAssetPriceInBlock } from "../../../../statev3/common/queries/useFetchViewAssetPrice";
import { getConfig } from "../../../../utils/queryContractUtils";
import { IS_DEV_MODE } from "../../../../../globals";

export interface UserUnrealized {
  unrealizedCollateral: ViewBigInt;
  unrealizedUsd: ViewBigInt;
  unrealizedPercent: ViewNumber;
}

export async function fetchUserUnrealized(user: Address, leverageToken: Address): Promise<UserUnrealized> {
  const profitData = await fetchUserLeverageTokenProfit({
    userId: user.toLowerCase(),
    leverageTokenId: leverageToken.toLowerCase(),
  });
  const position = profitData.user?.positions?.[0];
  if (!position && !IS_DEV_MODE) throw new Error("No position found");

  const totalDepositedInCollateralBigInt = BigInt(position?.totalEquityDepositedInCollateral || 0n);

  const { collateralAsset } = await fetchLeverageTokenAssets(leverageToken);

  const { tokenAmount, dollarAmount } = await fetchUserEquity(user, leverageToken);
  const currentEquityCollateralBigInt = tokenAmount.bigIntValue;
  const currentEquityUsdBigInt = dollarAmount.bigIntValue;

  const [collateralPriceData, collateralTokenData] = await Promise.all([
    fetchAssetPriceInBlock(getConfig(), collateralAsset),
    fetchToken(collateralAsset),
  ]);
  const collateralPriceBigInt = collateralPriceData;
  const collateralDecimals = collateralTokenData.decimals;

  const depositUsdBigInt = cValueInUsd(totalDepositedInCollateralBigInt, collateralPriceBigInt, collateralDecimals);

  const unrealizedCollateralBigInt =
    currentEquityCollateralBigInt != null
      ? currentEquityCollateralBigInt - totalDepositedInCollateralBigInt
      : undefined;

  const unrealizedUsdBigInt =
    currentEquityUsdBigInt != null && depositUsdBigInt != null ? currentEquityUsdBigInt - depositUsdBigInt : undefined;

  // 7) Format BigInt → ViewBigInt
  const unrealizedCollateralView = formatFetchBigIntToViewBigInt({
    bigIntValue: unrealizedCollateralBigInt,
    decimals: collateralDecimals,
    symbol: collateralTokenData.symbol,
  });
  const unrealizedUsdView = formatFetchBigIntToViewBigInt({
    bigIntValue: unrealizedUsdBigInt,
    decimals: dollarAmount.decimals,
    symbol: dollarAmount.symbol,
  });

  // 8) Compute %: (unrealizedUsd / depositUsd) × 100
  let unrealizedPercent = formatFetchNumberToViewNumber({
    value: 0,
    symbol: "%",
  });

  if ((depositUsdBigInt || 0n) > 0n) {
    const ratio = (Number(unrealizedUsdBigInt) / Number(depositUsdBigInt)) * 100;
    unrealizedPercent = formatFetchNumberToViewNumber({
      value: ratio,
      symbol: "%",
    });
  }

  return {
    unrealizedCollateral: unrealizedCollateralView,
    unrealizedUsd: unrealizedUsdView,
    unrealizedPercent,
  };
}

export function useFetchUserUnrealized(leverageToken?: Address) {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["fetchUserUnrealized", address, leverageToken],
    queryFn: () => fetchUserUnrealized(address!, leverageToken!),
    enabled: !!address && !!leverageToken,
  });
}
