import { Address } from "viem";
import { FlexCol, FlexRow, Icon, Typography } from "../../../../../../shared";
import { useFullTokenData } from "../../../../../state/common/meta-data-queries/useFullTokenData";

export const AssetHeading: React.FC<{ asset: Address }> = ({ asset }) => {
  const { data: tokenData } = useFullTokenData(asset);

  return (
    <FlexRow className="gap-6">
      <Icon width={50} alt={tokenData.symbol || ""} src={tokenData.logo} className="-mt-8" />
      <FlexCol className="gap-2 min-h-24">
        <Typography type="bold5">{tokenData.name}</Typography>
        <Typography type="regular2">{tokenData.description} </Typography>
      </FlexCol>
    </FlexRow>
  );
};
