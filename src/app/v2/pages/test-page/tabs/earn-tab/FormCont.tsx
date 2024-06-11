import React, { useEffect } from "react";
import { StrategyForm } from "../../../../components/forms/earn-forms/deposit-strategy-form/StrategyForm";
import { SupplyForm } from "../../../../components/forms/earn-forms/supply-form/SupplyForm";
import { Address } from "viem";
import { useFormSettingsContext } from "../../../../components/forms/contexts/useFormSettingsContext";
import { StrategyState } from "../../../../../state/common/types/StateTypes";
import { useFetchAssetByAddress } from "../../../../../state/common/hooks/useFetchAssetByAddress";

export const FormCont: React.FC<{
  asset?: Address;
}> = ({ asset }) => {
  const { setAsset, setSubStrategy, setIsStrategy } = useFormSettingsContext();
  const { data: assetState, isFetched } = useFetchAssetByAddress(asset);

  const onAssetChange = (asset?: Address) => {
    setAsset(asset);

    if (assetState?.isStrategy) {
      setIsStrategy(true);
      // set sub strategy to last one
      const { subStrategyData } = assetState as StrategyState;
      const index = subStrategyData.length - 1;
      const newSubStrategy = subStrategyData[index] ? subStrategyData[index].address : undefined;

      setSubStrategy(newSubStrategy);
    } else {
      setIsStrategy(false);
      setSubStrategy(undefined);
    }
  };

  useEffect(() => {
    if (isFetched) onAssetChange(asset);
  }, [isFetched, asset]);

  return (
    <div className="bg-white shadow-card px-8 rounded-card py-6">
      {assetState?.isStrategy ? <StrategyForm /> : <SupplyForm />}
    </div>
  );
};
