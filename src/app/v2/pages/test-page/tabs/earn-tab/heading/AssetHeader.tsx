import { Address } from "viem";
import { FlexCol, FlexRow, Icon, Typography } from "@shared";
import { useFullTokenData } from "../../../../../../state/common/meta-data-queries/useFullTokenData";
import { getIsStrategy } from "../../../../../../state/settings/configUtils";
import { ilmMediumUrl } from "@router";
import { Link } from "react-router-dom";

export const AssetHeading: React.FC<{ asset: Address }> = ({ asset }) => {
  const { data: tokenData } = useFullTokenData(asset);
  const isStrategy = getIsStrategy(asset);

  return (
    <FlexRow className="gap-6">
      <div className="min-w-10">
        <Icon width={50} height={50} alt={tokenData.symbol || ""} src={tokenData.logo} />
      </div>
      <FlexCol className="gap-2 min-h-24">
        <Typography type="bold5">{tokenData.name}</Typography>
        <Typography type="regular2">{tokenData.description} </Typography>
        {isStrategy && (
          <Typography type="bold2">
            For a high level overview on ILMs, check out this{" "}
            <Link to={ilmMediumUrl} target="_blank" rel="noopener noreferrer" className="underline">
              post.
            </Link>
          </Typography>
        )}
      </FlexCol>
    </FlexRow>
  );
};
