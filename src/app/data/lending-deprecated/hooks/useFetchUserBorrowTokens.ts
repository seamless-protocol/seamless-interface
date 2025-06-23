import { useFetchRawUserReservesData } from "../queries/useFetchRawUserReservesData";

export const useFetchUserBorrowTokens = () => {
  const { data, ...rest } = useFetchRawUserReservesData();

  return {
    ...rest,
    data: data?.[0].filter((reserve) => reserve.scaledVariableDebt > 0).map((reserve) => reserve.underlyingAsset) || [],
  };
};
