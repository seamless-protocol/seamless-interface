import { UseAccountReturnType, useAccount, useReadContracts } from "wagmi";
import { formatBigIntOnTwoDecimals } from "../utils/helpers";
import { loopStrategyAbi, loopStrategyAddress } from "../generated/generated";

function useFetchUserEquity(account: UseAccountReturnType) {
  let userEquity, userEquityUSD;
  const { data: results } = useReadContracts({
    contracts: [
      {
        address: loopStrategyAddress,
        abi: loopStrategyAbi,
        functionName: "balanceOf",
        args: [account.address as `0x${string}`],
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
    const userShares = BigInt(results[0].result || 0);
    const totalShares = BigInt(results[1].result || 1n);

    const equity = BigInt(results[2].result || 0n);
    const equityUSD = BigInt(results[3].result || 0n);

    userEquity = equity * (userShares / totalShares);
    userEquityUSD = equityUSD * (userShares / totalShares);
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
    userEquity: formatBigIntOnTwoDecimals(userEquity, 18),
    userEquityUSD: formatBigIntOnTwoDecimals(userEquityUSD, 8),
  };
};
