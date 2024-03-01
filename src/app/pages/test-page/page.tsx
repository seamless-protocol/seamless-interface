import { useState, useEffect } from "react";
import { ilmStrategies } from "../../state/loop-strategy/config/StrategyConfig";
import { useFetchAccountAssetBalance } from "../../state/common/hooks/useFetchAccountAssetBalance";
import { BalanceTestCmp } from "./BalanceTestCmp";

export const TestPage = () => {
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow((prev) => !prev);
    }, 200); // Toggle the show state every 500 ms

    return () => clearInterval(interval);
  }, []);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setShow2((prev) => !prev);
  //   }, 100); // Toggle the show state every 500 ms

  //   return () => clearInterval(interval);
  // }, []);

  // Fetching the balance for testing cache behavior
  const strategyConfig = ilmStrategies[0];
  const { balance } = useFetchAccountAssetBalance(
    strategyConfig.underlyingAsset.address
  );

  console.log({ balance });

  return (
    <div>
      {balance.viewValue}
      {show &&
        Array.from({ length: 16 }).map((_, index) => (
          <BalanceTestCmp key={index} />
        ))}
      {show2 &&
        Array.from({ length: 1000 }).map((_, index) => (
          <BalanceTestCmp key={index} />
        ))}
    </div>
  );
};
