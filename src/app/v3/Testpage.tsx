import { ethLong_1_5x } from "../../meta";
import { getTotalSupplyContractQueryOptions } from "../statev3/common/queries/TotalSupply/TotalSupply.fetch";
import { getEquityContractQueryOptions } from "../statev3/loop-strategy/queries/Equity/Equity.fetch";
import { invalidateDependentQueries } from "../statev3/loop-strategy/queries/LoopStrategy/InvalidateTest";
import { useFetchLoopStrategy } from "../statev3/loop-strategy/queries/LoopStrategy/LoopStrategy.hook";

export function Testpage() {
  const { data } = useFetchLoopStrategy(ethLong_1_5x);

  const testInvalidation = () => {
    const address = ethLong_1_5x;
    // getTotalSupplyContractQueryOptions(address).queryKey,
    // getEquityContractQueryOptions(address).queryKey,
    console.log("invalidating equity");
    invalidateDependentQueries([getEquityContractQueryOptions(address).queryKey]);
  };

  const testEquityInvalidation = () => {
    const address = ethLong_1_5x;
    // getTotalSupplyContractQueryOptions(address).queryKey,
    // getEquityContractQueryOptions(address).queryKey,
    console.log("invalidating total supply");
    invalidateDependentQueries([getTotalSupplyContractQueryOptions(address).queryKey]);
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
