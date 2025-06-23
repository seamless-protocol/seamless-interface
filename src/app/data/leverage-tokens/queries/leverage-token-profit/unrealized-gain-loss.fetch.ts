import { useQuery } from "@tanstack/react-query";
import { Address, formatUnits } from "viem";

import { useAccount } from "wagmi";
import { ONE_ETHER } from "../../../../../meta";
import {
  fetchToken,
  formatFetchBigIntToViewBigInt,
  formatFetchNumberToViewNumber,
  ViewBigInt,
  ViewNumber,
} from "../../../../../shared";
import { cValueInUsd } from "../../../common/math/cValueInUsd";
import { fetchAssetPriceInBlock } from "../../../common/queries/useFetchViewAssetPrice";
import { getConfig } from "../../../../utils/queryContractUtils";
import { fetchLeverageTokenAssets } from "../leverage-token-assets/leverage-token-assets.fetch";
import { fetchUserEquity } from "../user-equity/user-equity.fetch";
import { fetchUserLeverageTokenProfit } from "./user-leverage-token-profit.fetch";

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
  if (!position) {
    return {
      unrealizedCollateral: formatFetchBigIntToViewBigInt({
        bigIntValue: 0n,
        decimals: 0,
        symbol: "",
      }),
      unrealizedUsd: formatFetchBigIntToViewBigInt({
        bigIntValue: 0n,
        decimals: 0,
        symbol: "$",
      }),
      unrealizedPercent: formatFetchNumberToViewNumber({
        value: 0,
        symbol: "%",
      })
    };
  }

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

  if (unrealizedUsdBigInt && depositUsdBigInt && (depositUsdBigInt || 0n) > 0n) {
    // const ratio = (Number(unrealizedUsdBigInt) / Number(depositUsdBigInt)) * 100;
    const ratio = (unrealizedUsdBigInt * ONE_ETHER * 100n) / depositUsdBigInt;
    unrealizedPercent = formatFetchNumberToViewNumber({
      value: Number(formatUnits(ratio, 18)),
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
