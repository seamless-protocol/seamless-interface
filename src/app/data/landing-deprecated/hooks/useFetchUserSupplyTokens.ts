import { useFetchRawUserReservesData } from "../queries/useFetchRawUserReservesData";

export const useFetchUserSupplyTokens = () => {
  const { data, ...rest } = useFetchRawUserReservesData();

  return {
    ...rest,
    data:
      data?.[0].filter((reserve) => reserve.scaledATokenBalance > 0).map((reserve) => reserve.underlyingAsset) || [],
  };
};
