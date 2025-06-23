import { fetchToken, formatFetchBigIntToViewBigInt, ViewBigIntWithUsdValue, fUsdValueStructured } from "@shared";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { cValueInUsd } from "../../../common/math/cValueInUsd";
import { fetchAssetBalance } from "../../../common/queries/AssetBalance.hook";
import { fetchAssetPriceInBlock } from "../../../common/queries/AssetPrice.hook";
import { disableCacheQueryConfig } from "../../../settings/queryConfig";
import { fetchLeverageTokenAssets } from "../leverage-token-assets/leverage-token-assets.fetch";
import { fetchLeverageTokenEquity } from "../leverage-token-equity/leverage-token-equity.fetch";
import { fetchAssetTotalSupplyInBlock } from "../../../common/queries/AssetTotalSupply.hook";


export const fetchUserEquity = async (user: Address, leverageToken: Address): Promise<ViewBigIntWithUsdValue> => {
  const { collateralAsset } = await fetchLeverageTokenAssets(leverageToken);

  const [balance, collateralPrice, collateralTokenData, equity, totalSupply] = await Promise.all([
    fetchAssetBalance({ account: user, asset: leverageToken }),
    fetchAssetPriceInBlock(collateralAsset),
    fetchToken(collateralAsset),
    fetchLeverageTokenEquity(leverageToken),
    fetchAssetTotalSupplyInBlock({ asset: leverageToken, blockNumber: undefined }),
  ]);

  const userEquityInCollateral = balance.bigIntValue && equity.equityInCollateralAsset.bigIntValue && totalSupply.bigIntValue
    ? balance.bigIntValue * equity.equityInCollateralAsset.bigIntValue / totalSupply.bigIntValue
    : undefined;

  const userEquityUsd = cValueInUsd(userEquityInCollateral, collateralPrice.bigIntValue, collateralTokenData.decimals);

  return {
    tokenAmount: formatFetchBigIntToViewBigInt({
      bigIntValue: userEquityInCollateral,
      decimals: collateralTokenData.decimals,
      symbol: collateralTokenData.symbol,
    }),
    dollarAmount: formatFetchBigIntToViewBigInt(fUsdValueStructured(userEquityUsd)),
  };
};

export const useFetchUserEquity = (user?: Address, leverageToken?: Address) => {
  return useQuery({
    queryKey: ["userEquity", user, leverageToken],
    queryFn: () => fetchUserEquity(user!, leverageToken!),
    enabled: !!user && !!leverageToken,
    ...disableCacheQueryConfig,
  });
};
