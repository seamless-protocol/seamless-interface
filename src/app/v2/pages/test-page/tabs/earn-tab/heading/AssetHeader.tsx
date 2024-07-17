import { Address } from "viem";
import { FlexCol, FlexRow, Icon, Typography } from "../../../../../../../shared";
import { useFullTokenData } from "../../../../../../state/common/meta-data-queries/useFullTokenData";

export const AssetHeading: React.FC<{ asset: Address }> = ({ asset }) => {
  const { data: tokenData } = useFullTokenData(asset);

  return (
    <FlexRow className="gap-6">
      <div className="min-w-10">
        <Icon width={50} height={50} alt={tokenData.symbol || ""} src={tokenData.logo} />
      </div>
      <FlexCol className="gap-2 min-h-24">
        <Typography type="bold5">{tokenData.name}</Typography>
        <Typography type="regular2">{tokenData.description} </Typography>
      </FlexCol>
    </FlexRow>
  );
};
