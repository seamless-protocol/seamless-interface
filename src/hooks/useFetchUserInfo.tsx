import { UseAccountReturnType, useAccount, useReadContracts } from "wagmi";
import { formatBigIntOnTwoDecimals } from "../utils/helpers";
import {
  aaveOracleAbi,
  aaveOracleAddress,
  cbEthAbi,
  cbEthAddress,
} from "../generated/generated";
import { ONE_ETHER } from "../utils/constants";

function fetchAccountCbEthBalance(account: UseAccountReturnType) {
  if (!account || !account.address) {
    return {
      cbEthBalance: 0n,
      cbEthBalanceUSD: 0n,
    };
  }

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
    const cbEthPrice = BigInt(results[1].result || 0);

    cbEthBalance = BigInt(results[0].result || 0);
    cbEthBalanceUSD = (cbEthBalance * cbEthPrice) / ONE_ETHER;
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
    cbEthBalance: formatBigIntOnTwoDecimals(cbEthBalance, 18),
    cbEthBalanceUSD: formatBigIntOnTwoDecimals(cbEthBalanceUSD, 8),
  };
};
