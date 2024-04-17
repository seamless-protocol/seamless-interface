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
import { useEarnFormContext } from "../contexts/useEarnFormContext";

export const SupplySummary = () => {
  const { asset } = useEarnFormContext();

  const { data: tokenData } = useFullTokenData(asset);
  const {
    data: { aTokenAddress },
  } = useFetchReserveTokenAddresses(asset);

  const { data: aTokenData } = useFullTokenData(aTokenAddress);

  return (
    <FlexCol className="rounded-card bg-neutral-100 p-6 gap-4">
      <Typography type="bold3">Summary</Typography>
      <LocalRow label="Estimated APY">
        {asset && <LendingApy asset={asset} className="text-navy-1000" typography="medium2" />}
      </LocalRow>
      <LocalRow label="Rewards APR">
        {asset && <AssetApr asset={asset} className="text-navy-1000" typography="medium2" />}
      </LocalRow>
      <LocalRow label="Action">
        {asset && "Deposit"}
      </LocalRow>
      <LocalRow label="Strategy">{TokenDescriptionDict[asset]?.lendingTitle}</LocalRow>
      <LocalRow label="Starting Asset">
        {asset && <FlexRow className="gap-1">
          {`${tokenData.symbol}`} <Icon width={18} src={tokenData.logo} alt={tokenData.logo || ""} />
        </FlexRow>}
      </LocalRow>
      <LocalRow label="Ending Asset">{aTokenData.symbol}</LocalRow>
    </FlexCol>
  );
};

const LocalRow: React.FC<{
  label: string;
  children?: React.ReactNode;
}> = ({ label, children }) => {
  return (
    <FlexRow className="text-navy-600 justify-between">
      <Typography type="bold2">{label}</Typography>
      <Typography type="medium2" className="text-navy-1000">
        {children}
      </Typography>
    </FlexRow>
  );
};
