import { fetchToken, formatFetchBigIntToViewBigInt, ViewBigIntWithUsdValue, fUsdValueStructured } from "@shared";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { cValueInUsd } from "../../../../statev3/common/math/cValueInUsd";
import { fetchAssetBalance } from "../../../../statev3/queries/AssetBalance.hook";
import { fetchAssetPriceInBlock } from "../../../../statev3/queries/AssetPrice.hook";
import { disableCacheQueryConfig } from "../../../../statev3/settings/queryConfig";
import { fetchLeverageTokenAssets } from "../leverage-token-assets/leverage-token-assets.fetch";
import { fetchLeverageTokenEquity } from "../leverage-token-equity/leverage-token-equity.fetch";
import { fetchTotalSupply } from "../../../../statev3/queries/TotalSupply.hook";


export const fetchUserEquity = async (user: Address, leverageToken: Address): Promise<ViewBigIntWithUsdValue> => {
  const { collateralAsset } = await fetchLeverageTokenAssets(leverageToken);

  const [balance, collateralPrice, collateralTokenData, equity, totalSupply] = await Promise.all([
    fetchAssetBalance({ account: user, asset: leverageToken }),
    fetchAssetPriceInBlock(collateralAsset),
    fetchToken(collateralAsset),
    fetchLeverageTokenEquity(leverageToken),
    fetchTotalSupply({ asset: leverageToken }),
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
