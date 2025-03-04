import { ethLong_1_5x } from "../../meta";
import { useFetchLoopStrategy } from "../statev3/loop-strategy/queries/LoopStrategy/LoopStrategy.hook";
import { getEquityUsdContractQueryOptions } from "../statev3/loop-strategy/queries/Equity/EquityUsd.fetch";
import { invalidateGenericQueries } from "../statev3/loop-strategy/queries/LoopStrategy/InvalidateTest";
import { getTotalSupplyContractQueryOptions } from "../statev3/common/queries/TotalSupply/TotalSupply.fetch";
import { useQueryClient } from "@tanstack/react-query";

export function Testpage() {
  const queryClient = useQueryClient();
  const { data } = useFetchLoopStrategy(ethLong_1_5x);

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

    // invalidateGenericQueries({
    //   equityUSD: getEquityUsdContractQueryOptions(address).queryKey,
    //   equity: getEquityContractQueryOptions(address).queryKey,
    // });
  };

  const testEquityInvalidation = () => {
    const address = ethLong_1_5x;
    invalidateGenericQueries({
      totalSupply: getTotalSupplyContractQueryOptions(address),
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <button onClick={testInvalidation}>invalidate equity</button>
      <button onClick={testEquityInvalidation}>invalidate total supply</button>
      <div>
        <p>{String(data?.totalSupply) || "/"}</p>
        <p>{String(data?.equity) || "/"}</p>
      </div>
    </div>
  );
}
