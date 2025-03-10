import { DisplayPercentage, FlexCol, FlexRow, Typography } from "@shared";
import { Address } from "viem";
import { useFetchNativeApyHistorical } from "@data";

export const Heading: React.FC<{ vault?: Address }> = ({ vault }) => {
  const { data, ...rest } = useFetchNativeApyHistorical(vault);

  const { netApy, netApyWithoutRewards } = data || {};

  return (
    <FlexRow className="gap-4 md:gap-12">
      <FlexCol className="gap-2">
        <Typography type="bold2">Net APY</Typography>
        <DisplayPercentage
          typography="bold5"
          {...netApy}
          isLoading={rest.isLoading}
          errorMessage={rest.error?.message}
        />
      </FlexCol>
      <FlexCol className="gap-2">
        <Typography type="bold2">Native APY</Typography>
        <DisplayPercentage
          typography="bold5"
          {...netApyWithoutRewards}
          isLoading={rest.isLoading}
          errorMessage={rest.error?.message}
        />
      </FlexCol>
    </FlexRow>
  );
};
