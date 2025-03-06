import { ethLong_1_5x } from "../../meta";
import {
  useFetchLoopStrategy,
  useFetchLoopStrategyArray,
} from "../statev3/loop-strategy/queries/LoopStrategy/LoopStrategy.hook";
import { getEquityUsdContractQueryOptions } from "../statev3/loop-strategy/queries/Equity/EquityUsd.fetch";
import {
  invalidateGenericQueries,
  invalidateGenericQueriesArray,
} from "../statev3/loop-strategy/queries/LoopStrategy/InvalidateTest";
import { useQueryClient } from "@tanstack/react-query";
import { getEquityContractQueryOptions } from "../statev3/loop-strategy/queries/Equity/Equity.fetch";

function resolveAfter(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), ms);
  });
}

export function Testpage() {
  const queryClient = useQueryClient();
  const { data } = useFetchLoopStrategy(ethLong_1_5x);
  const { data: _data } = useFetchLoopStrategyArray(ethLong_1_5x);

  const testInvalidation = async () => {
    const address = ethLong_1_5x;

    await invalidateGenericQueries({
      equityUSD: getEquityUsdContractQueryOptions(address).queryKey,
      equity: getEquityContractQueryOptions(address).queryKey,
    });
  };

  const handleInvalidateGenericQueriesArray = async () => {
    const address = ethLong_1_5x;

    await invalidateGenericQueriesArray([
      getEquityUsdContractQueryOptions(address).queryKey[1],
      getEquityContractQueryOptions(address).queryKey[1],
    ]);
  };

  return (
    <div className="flex flex-col gap-4">
      <button onClick={testInvalidation}>invalidate equity</button>
      <button onClick={handleInvalidateGenericQueriesArray}>invalidate equity array</button>
      <div>
        <p>{String(data?.totalSupply) || "/"}</p>
        <p>{String(data?.equity) || "/"}</p>
        <p>{String(data?.eqDep) || "/"}</p>
      </div>
      <div>
        <p>{String(_data?.totalSupply) || "/"}</p>
        <p>{String(_data?.equity) || "/"}</p>
        <p>{String(_data?.eqDep) || "/"}</p>
      </div>
    </div>
  );
}
