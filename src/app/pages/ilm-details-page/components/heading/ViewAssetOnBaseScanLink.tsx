import { RouterConfig } from "@router";
import { useFullTokenData, Typography, FlexRow, Icon } from "@shared";
import { Address } from "viem";

export const ViewAssetOnBaseScanLink: React.FC<{
  address: Address;
  label?: string;
  className?: string;
}> = ({ address, label, className }) => {
  const {
    data: { symbol, logo },
  } = useFullTokenData(address);

  return (
    <div className={`text-text-secondary ${className}`}>
      <div className="px-4 py-3 pb-2">
        <Typography type="secondary12">{label}</Typography>
      </div>
      <a target="_blank" href={RouterConfig.Builder.baseScanAddress(address)} rel="noreferrer">
        <FlexRow className="items-center gap-3 px-4 py-3 hover:bg-action-hover">
          <Icon width={16} src={logo} alt={symbol || ""} />
          <Typography type="subheader1">{symbol}</Typography>
        </FlexRow>
      </a>
    </div>
  );
};
