import { UseAccountReturnType, useAccount } from "wagmi";
import { formatBigIntOnTwoDecimals } from "../../../../shared/utils/helpers";
import {
  cbEthAddress,
  useReadAaveOracleGetAssetPrice,
  useReadCbEthBalanceOf,
} from "../../../generated/generated";
import { ONE_ETHER } from "../../../meta/constants";

function useFetchAccountCbEthBalance(account: UseAccountReturnType) {
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
    useFetchAccountCbEthBalance(account);

  return {
    isLoading,
    cbEthBalance: formatBigIntOnTwoDecimals(cbEthBalance, 18),
    cbEthBalanceUSD: formatBigIntOnTwoDecimals(cbEthBalanceUSD, 8),
  };
};
