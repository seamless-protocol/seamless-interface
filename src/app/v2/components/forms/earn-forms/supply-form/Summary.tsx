import { DisplayNumber, FlexCol, FlexRow, Typography } from "@shared";

import { LendingApy } from "../../../AssetApy";
import { AssetApr } from "../../../AssetApr";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { DataRow } from "../../DataRow";
import { useFetchViewUserAccountData } from "../../../../../state/lending-borrowing/queries/useFetchViewUserAccountData";
import {
  Action,
  useFetchViewHealthFactorAfterAction,
} from "../../../../../state/lending-borrowing/hooks/useFetchViewHealthFactorAfterAction";
import { useAccount } from "wagmi";

export const Summary = ({ amount }: { amount: string }) => {
  const account = useAccount();

  const { asset } = useFormSettingsContext();

  const { data: userAccountData, ...UADRest } = useFetchViewUserAccountData();

  const { data: healthFactorAfterSupply, ...HFASRest } = useFetchViewHealthFactorAfterAction({
    reserve: asset,
    amount,
    action: Action.Deposit,
  });

  return (
    <FlexCol className="rounded-card bg-background-selected p-6 gap-4">
      <Typography type="bold3">Summary</Typography>
      <FlexRow className="text-navy-600 justify-between">
        <Typography type="bold2">Estimated APY</Typography>
        {asset && <LendingApy asset={asset} className="text-navy-1000" typography="medium2" />}
      </FlexRow>
      <FlexRow className="text-navy-600 justify-between">
        <Typography type="bold2">Rewards APR</Typography>
        {asset && <AssetApr asset={asset} className="text-navy-1000" typography="medium2" />}
      </FlexRow>
      {account.address && asset && (
        <>
          <DataRow label="Health factor">
            <DisplayNumber {...userAccountData?.healthFactor} {...UADRest} />
          </DataRow>
          <DataRow label="Future health factor">
            <DisplayNumber {...healthFactorAfterSupply} {...HFASRest} />
          </DataRow>
        </>
      )}
    </FlexCol>
  );
};
