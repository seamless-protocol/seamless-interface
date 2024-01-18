import { UseAccountReturnType, useAccount } from "wagmi";
import { formatBigIntOnTwoDecimals } from "../utils/helpers";
import {
  cbEthAddress,
  useReadAaveOracleGetAssetPrice,
  useReadCbEthBalanceOf,
} from "../generated/generated";
import { ONE_ETHER } from "../utils/constants";

function fetchAccountCbEthBalance(account: UseAccountReturnType) {
  const { data: cbEthBalance, isLoading: isLoadingCbEthBalance } =
    useReadCbEthBalanceOf({
      args: [account.address as `0x${string}`],
    });
  const { data: cbEthPrice, isLoading: isLoadingCbEthPrice } =
    useReadAaveOracleGetAssetPrice({
      args: [cbEthAddress],
    });

  let cbEthBalanceUSD;
  if (cbEthBalance && cbEthPrice) {
    cbEthBalanceUSD = (cbEthBalance * cbEthPrice) / ONE_ETHER;
  }

  return {
    isLoading: isLoadingCbEthBalance || isLoadingCbEthPrice,
    cbEthBalance,
    cbEthBalanceUSD,
  };
}

export const useFetchUserInfo = () => {
  const account = useAccount();
  const { isLoading, cbEthBalance, cbEthBalanceUSD } =
    fetchAccountCbEthBalance(account);

  return {
    isLoading,
    cbEthBalance: formatBigIntOnTwoDecimals(cbEthBalance, 18),
    cbEthBalanceUSD: formatBigIntOnTwoDecimals(cbEthBalanceUSD, 8),
  };
};
