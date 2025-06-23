import { formatFetchBigIntToViewBigInt, fUsdValueStructured, IRHFAmountInputProps, RHFAmountInputV3 } from "@shared";
import { useLeverageTokenFormContext } from "../leverage-token-form-provider/LeverageTokenFormProvider";
import { useMemo } from "react";
import { cValueInUsd } from "../../../../../data/common/math/utils";
import { parseUnits } from "viem";
import { useFullTokenData } from "../../../../../data/common/meta-data-queries/useFullTokenData";
import { useFetchLeverageTokenAssets } from "../../../../../data/leverage-tokens/queries/leverage-token-assets/leverage-token-assets.hook";
import { useFetchAssetPriceInBlock } from "../../../../../data/common/queries/useFetchViewAssetPrice";
import { useFetchUserEquity } from "../../../../../data/leverage-tokens/queries/user-equity/user-equity.fetch";
import { useAccount } from "wagmi";

type IStrategyProps<T> = Omit<IRHFAmountInputProps, "assetPrice" | "walletBalance" | "assetAddress" | "assetButton"> & {
  name: keyof T;
};

export function RHFWithdrawStrategyAmountField<T>({ ...other }: IStrategyProps<T>) {
  const { address } = useAccount();

  const { selectedLeverageToken, debouncedWithdrawAmount } = useLeverageTokenFormContext();

  const { data: leverageTokenAssets } = useFetchLeverageTokenAssets(selectedLeverageToken.data?.address);

  const { data: collateralTokenData, ...collateralTokenRest } = useFullTokenData(leverageTokenAssets?.collateralAsset);

  const { data: collateralAssetPriceData, ...collateralAssetPriceRest } = useFetchAssetPriceInBlock(
    leverageTokenAssets?.collateralAsset
  );

  const { data: userEquityData, ...userEquityRest } = useFetchUserEquity(address, selectedLeverageToken.data?.address);

  const withdrawAmountUsdValue = useMemo(() => {
    if (collateralAssetPriceData?.bigIntValue && collateralTokenData?.decimals) {
      return formatFetchBigIntToViewBigInt(
        fUsdValueStructured(
          cValueInUsd(
            parseUnits(debouncedWithdrawAmount, collateralTokenData?.decimals),
            collateralAssetPriceData.bigIntValue,
            collateralTokenData?.decimals
          )
        )
      );
    }

    return undefined;
  }, [collateralAssetPriceData?.bigIntValue, debouncedWithdrawAmount]);

  return (
    <RHFAmountInputV3
      {...other}
      assetAddress={leverageTokenAssets?.collateralAsset}
      dollarValue={{
        data: { ...withdrawAmountUsdValue },
        isLoading: collateralAssetPriceRest.isLoading || collateralTokenRest.isLoading,
        isFetched: collateralAssetPriceRest.isFetched && collateralTokenRest.isFetched,
      }}
      walletBalance={{
        ...userEquityRest,
        data: userEquityData?.tokenAmount,
      }}
      protocolMaxValue={{
        ...userEquityRest,
        data: userEquityData?.tokenAmount,
      }}
      tokenData={{ ...collateralTokenRest, data: collateralTokenData || {} }}
    />
  );
}
