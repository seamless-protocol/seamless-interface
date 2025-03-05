import { ethLong_1_5x } from "../../meta";
import {
  baseQKLoopStrategy,
  useFetchLoopStrategy,
  useFetchLoopStrategyArray,
} from "../statev3/loop-strategy/queries/LoopStrategy/LoopStrategy.hook";
import { getEquityUsdContractQueryOptions } from "../statev3/loop-strategy/queries/Equity/EquityUsd.fetch";
import {
  invalidateGenericQueries,
  invalidateGenericQueriesArray,
} from "../statev3/loop-strategy/queries/LoopStrategy/InvalidateTest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getEquityContractQueryOptions } from "../statev3/loop-strategy/queries/Equity/Equity.fetch";
import { data } from "cypress/types/jquery";

function resolveAfter(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), ms);
  });
}

export function Testpage() {
  const queryClient = useQueryClient();
  // const { data } = useFetchLoopStrategy(ethLong_1_5x);
  const { data } = useFetchLoopStrategyArray(ethLong_1_5x);

  const { mutate, isPending } = useMutation({
    mutationFn: () => resolveAfter(100),
    // meta: {
    //   invalidates: {
    //     equityUSD: getEquityUsdContractQueryOptions(ethLong_1_5x).queryKey,
    //     equity: getEquityContractQueryOptions(ethLong_1_5x).queryKey,
    //   },
    // },
  });

  const testInvalidation = () => {
    const address = ethLong_1_5x;
    console.log({
      qq: getEquityUsdContractQueryOptions(address).queryKey,
    });
    console.log("invalidating equity");

    // queryClient.invalidateQueries({
    //   queryKey: getEquityUsdContractQueryOptions(address).queryKey,
    // });
    // queryClient.invalidateQueries({
    //   queryKey: getEquityContractQueryOptions(address).queryKey,
    // });
    // queryClient.invalidateQueries({
    //   queryKey: [{ equityUSD: getEquityUsdContractQueryOptions(address).queryKey }],
    // });

    invalidateGenericQueries({
      equityUSD: getEquityUsdContractQueryOptions(address).queryKey,
      equity: getEquityContractQueryOptions(address).queryKey,
    });
  };

  const handleInvalidateGenericQueriesArray = () => {
    const address = ethLong_1_5x;

    invalidateGenericQueriesArray([
      getEquityUsdContractQueryOptions(address).queryKey[1],
      getEquityContractQueryOptions(address).queryKey[1],
    ]);
  };

  const handleInvalidateLoopStr = () => {
    const address = ethLong_1_5x;
    invalidateGenericQueriesArray([{ functionName: "FetchLoopStrategy", address }]);
  };

  return (
    <div className="flex flex-col gap-4">
      <button onClick={testInvalidation}>invalidate equity</button>
      <button onClick={handleInvalidateGenericQueriesArray}>invalidate equity array</button>
      <button onClick={handleInvalidateLoopStr}>handleInvalidateLoopStr</button>
      <button onClick={() => mutate()}>{isPending ? "mutating" : "mutate equity"}</button>
      <div>
        <p>{String(data?.totalSupply) || "/"}</p>
        <p>{String(data?.equity) || "/"}</p>
      </div>
    </div>
  );
}
