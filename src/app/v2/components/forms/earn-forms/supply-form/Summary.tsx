import { DisplayNumber, FlexCol, FlexRow, Typography } from "@shared";

import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { DataRow } from "../../DataRow";
import { useFetchViewUserAccountData } from "../../../../../state/lending-borrowing/queries/useFetchViewUserAccountData";
import {
  Action,
  useFetchViewHealthFactorAfterAction,
} from "../../../../../state/lending-borrowing/hooks/useFetchViewHealthFactorAfterAction";
import { useAccount } from "wagmi";
import { SupplyApr } from "../../../asset-data/AssetApr";
import { LendingApy } from "../../../asset-data/AssetApy";

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
        <Typography type="bold2">Supply APY</Typography>
        {asset && <LendingApy asset={asset} className="text-navy-1000" />}
      </FlexRow>
      <FlexRow className="text-navy-600 justify-between">
        <Typography type="bold2">Rewards APR</Typography>
        {asset && <SupplyApr asset={asset} className="text-navy-1000" />}
      </FlexRow>
      {account.address && asset && userAccountData?.totalDebt?.bigIntValue !== 0n && (
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
