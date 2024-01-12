import { useAccount, useReadContracts } from "wagmi";
import { loopStrategyAbi, loopStrategyAddress } from "../generated";
import { formatOnTwoDecimals, formatToNumber } from "../utils/helpers";

function useFetchUserEquity(account: any) {
  let userEquity, userEquityUSD;
  if (account) {
    const { data: results } = useReadContracts({
      contracts: [
        {
          address: loopStrategyAddress,
          abi: loopStrategyAbi,
          functionName: "balanceOf",
          args: [account.address],
        },
        {
          address: loopStrategyAddress,
          abi: loopStrategyAbi,
          functionName: "totalSupply",
        },
        {
          address: loopStrategyAddress,
          abi: loopStrategyAbi,
          functionName: "equity",
        },
        {
          address: loopStrategyAddress,
          abi: loopStrategyAbi,
          functionName: "equityUSD",
        },
      ],
    });

    if (results) {
      const userShares = formatToNumber(results[0].result, 18);
      const totalShares = formatToNumber(results[1].result, 18);

      const equity = formatToNumber(results[2].result, 18);
      const equityUSD = formatToNumber(results[3].result, 8);

      userEquity = equity * (userShares / totalShares);
      userEquityUSD = equityUSD * (userShares / totalShares);
    }
  }

  return {
    userEquity,
    userEquityUSD,
  };
}

export const useFetchWithdrawInfo = () => {
  const account = useAccount();
  const { userEquity, userEquityUSD } = useFetchUserEquity(account);

  return {
    userEquity: formatOnTwoDecimals(userEquity),
    userEquityUSD: formatOnTwoDecimals(userEquityUSD),
  };
};
