import { Address } from "viem";
import { FlexCol, FlexRow, Icon, Typography, useFullTokenData } from "../../../../../../shared";
import {
  TokenDescriptionDict,
  getTokenDescription,
} from "../../../../../../shared/state/meta-data-queries/useTokenDescription";

export const AssetHeading: React.FC<{ asset: Address; isStrategy: boolean }> = ({ asset, isStrategy }) => {
  const { data: tokenData } = useFullTokenData(asset);

  const description = getTokenDescription(asset, isStrategy);

  return (
    <FlexRow className="gap-6">
      <Icon width={50} alt={tokenData.symbol || ""} src={tokenData.logo} className="-mt-8" />
      <FlexCol className="gap-2 min-h-24">
        <Typography type="bold5">
          {isStrategy ? TokenDescriptionDict[asset]?.strategyTitle : tokenData?.name}
        </Typography>
        <Typography type="regular2">{description} </Typography>
      </FlexCol>
    </FlexRow>
  );
};
