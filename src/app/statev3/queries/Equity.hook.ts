import { Address } from "viem";
import { fetchTokenData } from "../metadata/TokenData.fetch";
import { loopStrategyAbi } from "../../generated";
import { FetchTokenAmountWithUsdValueStrict, formatFetchBigInt, formatUsdValue } from "../../../shared";
import { queryContract, queryOptions } from "../../utils/queryContractUtils";

export interface FetchEquityInBlockInput {
  strategy: Address;
  blockNumber: bigint | undefined;
}

export async function fetchEquityInBlock({
  strategy,
  blockNumber,
}: FetchEquityInBlockInput): Promise<FetchTokenAmountWithUsdValueStrict> {
  const { symbol, decimals } = await fetchTokenData(strategy);

  const [equity, equityUsd] = await Promise.all([
    queryContract(
      queryOptions({
        address: strategy,
        abi: loopStrategyAbi,
        functionName: "equity",
        blockNumber,
      })
    ),
    queryContract(
      queryOptions({
        address: strategy,
        abi: loopStrategyAbi,
        functionName: "equityUSD",
        blockNumber,
      })
    ),
  ]);

  return {
    tokenAmount: formatFetchBigInt(equity, decimals, symbol),
    dollarAmount: formatUsdValue(equityUsd),
  };
}
