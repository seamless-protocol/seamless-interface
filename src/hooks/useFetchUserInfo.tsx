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
  let cbEthBalance, cbEthBalanceUSD;
  const { data: results } = useReadContracts({
    contracts: [
      {
        address: cbEthAddress,
        abi: cbEthAbi,
        functionName: "balanceOf",
        args: [account.address as `0x${string}`],
      },
      {
        address: aaveOracleAddress,
        abi: aaveOracleAbi,
        functionName: "getAssetPrice",
        args: [cbEthAddress],
      },
    ],
  });

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
