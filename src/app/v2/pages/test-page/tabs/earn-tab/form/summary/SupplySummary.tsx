import {
  FlexRow,
  Icon,
  Typography,
  useFullTokenData,
} from "@shared";

import { TokenDescriptionDict } from "../../../../../../../../shared/state/meta-data-queries/useTokenDescription";
import { useFetchReserveTokenAddresses } from "../../../../../../../state/lending-borrowing/queries/useFetchReserveTokenAddresses";
import { Address } from "viem";

export const SupplySummary: React.FC<{
  asset: Address
}> = ({ asset }) => {
  const { data: tokenData } = useFullTokenData(asset);
  const {
    data: { aTokenAddress },
  } = useFetchReserveTokenAddresses(asset);

  const { data: aTokenData } = useFullTokenData(aTokenAddress);

  return (
    <>
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
    </>
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
