import { useAccount, useReadContracts } from "wagmi";
import {
  aaveOracleAbi,
  aaveOracleAddress,
  cbEthAbi,
  cbEthAddress,
} from "../generated/generated";
import { ONE_ETHER } from "../utils/constants";
import { formatToNumber } from "../utils/helpers";

function fetchAccountCbEthBalance(account: any) {
  const { data: results, isLoading } = useReadContracts({
    contracts: [
      {
        address: cbEthAddress,
        abi: cbEthAbi,
        functionName: "balanceOf",
        args: [account?.address],
      },
      {
        address: aaveOracleAddress,
        abi: aaveOracleAbi,
        functionName: "getAssetPrice",
        args: [cbEthAddress],
      },
    ],
  });

  let cbEthBalance, cbEthBalanceUSD;
  if (results) {
    const cbEthPrice = BigInt(results[1].result || 0);

    cbEthBalance = BigInt(results[0].result || 0);
    cbEthBalanceUSD = (cbEthBalance * cbEthPrice) / ONE_ETHER;
  }

  return {
    isLoading,
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
    cbEthBalance: formatToNumber(cbEthBalance, 18),
    cbEthBalanceUSD: formatToNumber(cbEthBalanceUSD, 8),
  };
};
