import {
  useWatchAsset,
  useFullTokenData,
  Typography,
  FlexRow,
  Icon,
} from "@shared";
import { Address } from "viem";

export const WatchAssetButton: React.FC<{
  address: Address;
  label?: string;
  className?: string;
}> = ({ address, label, className }) => {
  const { mutateAsync } = useWatchAsset();
  const { data: tokenData } = useFullTokenData(address);

  const handleWatchAsset = async () => {
    if (!tokenData.decimals || !tokenData.symbol) return;

    await mutateAsync({
      address,
      ...tokenData,
      decimals: tokenData.decimals,
      symbol: tokenData.symbol,
    });
  };

  return (
    <div className={`text-text-secondary ${className}`}>
      <div className="px-4 py-3 pb-2">
        <Typography type="secondary12">{label}</Typography>
      </div>
      <button
        onClick={handleWatchAsset}
        className="focus:outline-none w-full text-left"
      >
        <FlexRow className="items-center gap-3 px-4 py-3 hover:bg-action-hover">
          <Icon width={16} src={tokenData.logo} alt={tokenData.symbol || ""} />
          <Typography type="subheader1">{tokenData.symbol}</Typography>
        </FlexRow>
      </button>
    </div>
  );
};
