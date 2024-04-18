import {
  FlexCol,
  FlexRow,
  Icon,
  Typography,
  useFullTokenData,
} from "@shared";

import { TokenDescriptionDict } from "../../../../../../shared/state/meta-data-queries/useTokenDescription";
import { useFetchReserveTokenAddresses } from "../../../../../state/lending-borrowing/queries/useFetchReserveTokenAddresses";

import { LendingApy } from "../../../AssetApy";
import { AssetApr } from "../../../AssetApr";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { DataRow } from "../../DataRow";

export const Summary = () => {
  const { asset } = useFormSettingsContext();

  const { data: tokenData } = useFullTokenData(asset);
  const {
    data: { aTokenAddress },
  } = useFetchReserveTokenAddresses(asset);

  const { data: aTokenData } = useFullTokenData(aTokenAddress);

  return (
    <FlexCol className="rounded-card bg-neutral-100 p-6 gap-4">
      <Typography type="bold3">Summary</Typography>
      <FlexRow className="text-navy-600 justify-between">
        <Typography type="bold2">Estimated APY</Typography>
        {asset && <LendingApy asset={asset} className="text-navy-1000" typography="medium2" />}
      </FlexRow>
      <FlexRow className="text-navy-600 justify-between">
        <Typography type="bold2">Rewards APR</Typography>
        {asset && <AssetApr asset={asset} className="text-navy-1000" typography="medium2" />}
      </FlexRow>
      <DataRow label="Action">
        {asset && "Deposit"}
      </DataRow>
      <DataRow label="Strategy">{TokenDescriptionDict[asset]?.lendingTitle}</DataRow>
      <DataRow label="Starting Asset">
        {asset && <FlexRow className="gap-1 text-navy-1000">
          {`${tokenData.symbol}`} <Icon width={18} src={tokenData.logo} alt={tokenData.logo || ""} />
        </FlexRow>}
      </DataRow>
      <DataRow label="Ending Asset">{aTokenData.symbol}</DataRow>
    </FlexCol >
  );
};
