import { fetchToken, formatFetchBigIntToViewBigInt, ViewBigIntWithUsdValue, fUsdValueStructured } from "@shared";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { cValueFromUsd, cValueInUsd } from "../../../../statev3/common/math/cValueInUsd";
import { fetchAssetBalance } from "../../../../statev3/queries/AssetBalance.hook";
import { fetchAssetPriceInBlock } from "../../../../statev3/queries/AssetPrice.hook";
import { disableCacheQueryConfig } from "../../../../statev3/settings/queryConfig";
import { fetchLeverageTokenAssets } from "../leverage-token-assets/leverage-token-assets.fetch";


export const fetchUserEquity = async (user: Address, leverageToken: Address): Promise<ViewBigIntWithUsdValue> => {
  const { collateralAsset } = await fetchLeverageTokenAssets(leverageToken);

  const [balance, sharePrice, collateralPrice, collateralTokenData, leverageTokenData] = await Promise.all([
    fetchAssetBalance({ account: user, asset: leverageToken }),
    fetchAssetPriceInBlock(leverageToken),
    fetchAssetPriceInBlock(collateralAsset),
    fetchToken(collateralAsset),
    fetchToken(leverageToken),
  ]);

  const userEquityUsd = cValueInUsd(balance.bigIntValue, sharePrice.bigIntValue, leverageTokenData.decimals);
  const userEquityInCollateral = cValueFromUsd(
    userEquityUsd,
    collateralPrice.bigIntValue,
    collateralTokenData.decimals
  );

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
