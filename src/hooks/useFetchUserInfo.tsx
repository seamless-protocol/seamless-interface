import { useAccount } from "wagmi";
import { useSeamlessContractReads } from "./useSeamlessContractReads";
import { CBETH_ADDRESS } from "../utils/constants";
import { formatOnTwoDecimals, formatToNumber } from "../utils/helpers";

function fetchAccountCbEthBalance(account: any) {
  const { data: results } = useSeamlessContractReads([
    {
      contractName: "cbETH",
      functionName: "balanceOf",
      args: [account?.address] as never[],
    },
    {
      contractName: "AaveOracle",
      functionName: "getAssetPrice",
      args: [CBETH_ADDRESS] as never[],
    },
  ]);

  let cbEthBalance, cbEthBalanceUSD;
  if (results && account) {
    cbEthBalance = formatToNumber(results![0].result as any as string, 18);
    const cbEthPrice = formatToNumber(results![1].result as any as string, 8);
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
