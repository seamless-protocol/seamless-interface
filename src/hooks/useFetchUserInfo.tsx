import { useAccount, useReadContracts } from "wagmi";
import { formatOnTwoDecimals, formatToNumber } from "../utils/helpers";
import {
  aaveOracleAbi,
  aaveOracleAddress,
  cbEthAbi,
  cbEthAddress,
} from "../generated";

function fetchAccountCbEthBalance(account: any) {
  const { data: results } = useReadContracts({
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
    cbEthBalance = formatToNumber(results[0].result, 18);
    const cbEthPrice = formatToNumber(results[1].result, 8);
    cbEthBalanceUSD = cbEthBalance * cbEthPrice;
  }

  return {
    cbEthBalance,
    cbEthBalanceUSD,
  };
}

export const useFetchUserInfo = () => {
  const account = useAccount();
  const { cbEthBalance, cbEthBalanceUSD } = fetchAccountCbEthBalance(account);

  return {
    cbEthBalance: formatOnTwoDecimals(cbEthBalance),
    cbEthBalanceUSD: formatOnTwoDecimals(cbEthBalanceUSD),
  };
};
